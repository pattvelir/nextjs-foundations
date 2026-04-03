"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export function Taxonomy({ article }: { article: Article | null }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      {article?.tags?.map((tag, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-chart-4 text-accent-foreground rounded mb-4"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
