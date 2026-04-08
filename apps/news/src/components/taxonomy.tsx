"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";

export function Taxonomy({
  article,
  count = 3,
  showBreaking = true,
}: {
  article: Article | null;
  count?: number;
  showBreaking?: boolean;
}) {
  return (
    <div>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {article?.tags?.slice(0, count).map((tag, index) => (
          <span
            key={index}
            className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-chart-4 text-accent-foreground rounded mb-4"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
