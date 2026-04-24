"use client";

import { useEffect, useState } from "react";
import { SubscriptionSubmitButton } from "./subscription-submit-button";
import { SubscriptionStatus } from "@repo/models/subscription-status";
import { toggleSubscription } from "@/app/actions";
import { getSubscriptionStatus } from "@/app/actions";
import { useRouter } from "next/navigation";

export function SubscriptionToggle({ cta = "Subscribe" }: { cta: string }) {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function loadStatus() {
      const status = await getSubscriptionStatus();
      setSubscriptionStatus(status);
      setIsLoading(false);
    }
    loadStatus();
  }, []);
  const handleSubmit = async (formData: FormData) => {
    await toggleSubscription(formData);

    const updatedStatus = await getSubscriptionStatus();
    setSubscriptionStatus(updatedStatus);
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
    <form action={handleSubmit}>
      <SubscriptionSubmitButton
        key={subscriptionStatus?.status}
        text={subscriptionText}
      />
    </form>
  );
}
