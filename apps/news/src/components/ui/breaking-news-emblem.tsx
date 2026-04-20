"use client";

import { AlertCircle } from "lucide-react";

export function BreakingNewsEmblem() {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded bg-destructive px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
      <AlertCircle className="h-3.5 w-3.5" />
      Breaking
    </span>
  );
}
