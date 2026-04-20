"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";
import { BreakingNews } from "@repo/models/breaking-news";

export function BreakingNewsBannerInner({
  breakingNews,
}: {
  breakingNews: BreakingNews | null;
}) {
  const [isVisible, setIsVisible] = useState(true);
  if (!breakingNews) return null;
  if (!isVisible) return null;

  return (
    <div className="bg-accent text-foreground relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <BreakingNewsEmblem />
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <Link href={breakingNews?.url} className="group">
              <p className="truncate text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-500">
                {breakingNews?.headline}
              </p>
            </Link>
          </div>
        </div>
        <div className="ml-4 flex shrink-0 items-center gap-3">
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-full p-1 transition-colors hover:bg-primary/10"
            aria-label="Dismiss breaking news"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
