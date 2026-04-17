"use client";
import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { SubscriptionStatus } from "@repo/models/subscription-status";
import { subscribe } from "@/app/actions";
import { unsubscribe } from "@/app/actions";
import { getSubscriptionStatus } from "@/app/actions";
import { useRouter } from "next/navigation";

export function SubscriptionToggle({ cta = "Subscribe" }: { cta: string }) {
  const router = useRouter();
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

    router.refresh();
  };

  const subscriptionText = isLoading
    ? "Loading..."
    : subscriptionStatus == null
      ? cta
      : subscriptionStatus.status === "active"
        ? "Unsubscribe"
        : "Resubscribe";

  return (
    <Button onClick={handleSubscriptionChange} className="hover:underline">
      {subscriptionText}
    </Button>
  );
}
