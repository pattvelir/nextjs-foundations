"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export function BreakingNews({ articles }: { articles: Article[] | null }) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (articles ? articles.length : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!articles) return null;
  if (!isVisible) return null;

  return (
    <div className="bg-accent text-foreground relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1.5 rounded bg-destructive px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            Breaking
          </span>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <Link
              href={articles[currentIndex].url}
              key={currentIndex}
              className="group"
            >
              <p className="truncate text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-500">
                {articles[currentIndex].title}
              </p>
            </Link>
          </div>
        </div>
        <div className="ml-4 flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-4 bg-primary"
                    : "bg-primary/40 hover:bg-primary/60"
                }`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
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
