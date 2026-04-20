"use server";

import { apiFetch } from "@/app/lib/api";
import { cookies } from "next/headers";
import { SubscriptionStatus } from "@repo/models/subscription-status";

export async function toggleSubscription(formData: FormData): Promise<void> {
  const cookiesList = await cookies();

  // Check to make sure the user isn't already subscribed.
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;
  let subscriptionStatus: SubscriptionStatus | null;
  if (subscriptionToken) {
    // If the user is already subscribed, we'll get the subscription status.
    subscriptionStatus = await apiFetch<SubscriptionStatus>(
      `/subscription`,
      "GET",
      { "x-subscription-token": subscriptionToken },
    );

    // If we didn't find a valid subscription status, delete the existing cookie,
    // create and activate the subscription.
    if (!subscriptionStatus) {
      cookiesList.delete("subscriptionToken");
      subscriptionStatus = await createSubscription();
    } else {
      // If the subscription status is not active, we'll reactivate it.
      if (subscriptionStatus.status !== "active") {
        await subscribe(subscriptionStatus.token);
      } else {
        // If the subscription status is active, we'll unsubscribe.
        await unsubscribe(subscriptionStatus.token);
      }
    }
  } else {
    // If no subscription token cookie exists, we'll create a new subscription
    // and activate it.
    await createSubscription();
  }
}

export async function createSubscription(): Promise<SubscriptionStatus | null> {
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription/create`,
    "POST",
  );
  if (subscriptionStatus != null) {
    return subscribe(subscriptionStatus.token);
  }

  return null;
}

export async function subscribe(
  subscriptionToken: string,
): Promise<SubscriptionStatus | null> {
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "POST",
    {
      "x-subscription-token": subscriptionToken,
    },
  );

  if (subscriptionStatus != null) {
    const cookiesList = await cookies();
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
  return null;
}

export async function unsubscribe(
  subscriptionToken: string,
): Promise<SubscriptionStatus | null> {
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "DELETE",
    { "x-subscription-token": subscriptionToken },
  );

  if (subscriptionStatus != null) {
    // Delete the cookie.
    const cookiesList = await cookies();

    cookiesList.delete("subscriptionToken");
    return subscriptionStatus;
  }
  return null;
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
