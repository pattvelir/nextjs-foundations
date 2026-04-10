import { apiFetch } from "@/app/lib/api";
import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const subscriptionToken = request.headers.get("x-subscription-token");

  // If we don't have a subscription token, we'll return null.
  if (!subscriptionToken) {
    return Response.json(null);
  }

  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "DELETE",
    { "x-subscription-token": subscriptionToken },
  );
  console.log("unsubscribe status result:", subscriptionStatus);

  return Response.json(subscriptionStatus);
}
