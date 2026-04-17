"use server";

import { apiFetch } from "@/app/lib/api";
import { cookies } from "next/headers";
import { SubscriptionStatus } from "@repo/models/subscription-status";

export async function subscribe(): Promise<SubscriptionStatus | null> {
  const cookiesList = await cookies();

  // Check to make sure the user isn't already subscribed.
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;
  let subscriptionStatus;

  if (subscriptionToken) {
    // If the user is already subscribed, we'll get the subscription status.
    subscriptionStatus = await apiFetch<SubscriptionStatus>(
      `/subscription`,
      "GET",
      { "x-subscription-token": subscriptionToken },
    );

    // If we didn't find a valid subscription status, delete the existing cookie,
    // and re-create the subscription.
    if (!subscriptionStatus) {
      cookiesList.delete("subscriptionToken");
    } else {
      // If the subscription status is not active, we'll reactivate it.
      if (subscriptionStatus.status !== "active") {
        subscriptionStatus = await apiFetch<SubscriptionStatus>(
          `/subscription`,
          "POST",
          { "x-subscription-token": subscriptionToken },
        );
      }
    }
  }

  // If no subscription token exists, or if it was invalid, we'll create a new subscription.
  if (!subscriptionStatus) {
    subscriptionStatus = await apiFetch<SubscriptionStatus>(
      `/subscription/create`,
      "POST",
    );
  }

  // If the subscription creation failed, we'll return null.
  if (!subscriptionStatus) {
    return null;
  }

  // Automatically activate the subscription.
  subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "POST",
    { "x-subscription-token": subscriptionStatus.token },
  );

  // If the activation failed, we'll return null.
  if (!subscriptionStatus) {
    return null;
  }

  // Finally, if everything succeeded, we'll set the cookie and return the status.
  cookiesList.set("subscriptionToken", subscriptionStatus.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return subscriptionStatus;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus | null> {
  const cookiesList = await cookies();
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;

  if (!subscriptionToken) {
    return null;
  }
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    "/subscription",
    "GET",
    { "x-subscription-token": subscriptionToken },
  );

  // If we don't get a subscription status back, we'll return null as the user isn't subscribed.
  if (!subscriptionStatus) {
    return null;
  }

  return subscriptionStatus;
}

export async function unsubscribe(
  subscriptionStatus: SubscriptionStatus,
): Promise<SubscriptionStatus | null> {
  const subscriptionToken = subscriptionStatus.token;

  // If we don't have a subscription token, we'll return null.
  if (!subscriptionToken) {
    return null;
  }

  subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "DELETE",
    { "x-subscription-token": subscriptionToken },
  );
  console.log("unsubscribe status result:", subscriptionStatus);

  return subscriptionStatus;
}
