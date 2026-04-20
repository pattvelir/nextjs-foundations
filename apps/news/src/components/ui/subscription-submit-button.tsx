"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function SubscriptionSubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? "Processing..." : text}</Button>;
}
