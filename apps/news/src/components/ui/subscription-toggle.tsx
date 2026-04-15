"use client";
import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { SubscriptionStatus } from "@repo/models/subscription-status";
import { subscribe } from "@/app/lib/subscribe";
import { unsubscribe } from "@/app/lib/unsubscribe";
import { getSubscriptionStatus } from "@/app/lib/subscription-status";

export function SubscriptionToggle() {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      const status = await getSubscriptionStatus();
      setSubscriptionStatus(status);
      setIsLoading(false);
    }

    loadStatus();
  }, []);

  const handleSubscriptionChange = async () => {
    if (subscriptionStatus != null) {
      if (subscriptionStatus.status === "active") {
        setSubscriptionStatus(await unsubscribe(subscriptionStatus));
      } else if (subscriptionStatus.status === "inactive") {
        setSubscriptionStatus(await subscribe());
      }
    } else {
      setSubscriptionStatus(await subscribe());
    }
  };

  const subscriptionText = isLoading
    ? "Loading..."
    : subscriptionStatus == null
      ? "Subscribe"
      : subscriptionStatus.status === "active"
        ? "Unsubscribe"
        : "Resubscribe";

  return (
    <Button onClick={handleSubscriptionChange} className="hover:underline">
      {subscriptionText}
    </Button>
  );
}
