"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";
import { BreakingNews } from "@repo/models/breaking-news";
import { Category } from "@repo/models/category";

export function HeaderNavigation({
  categories,
}: {
  categories: Category[] | null;
}) {
  if (!categories) {
    return null;
  }

  return (
    <>
      <li key={"home"}>
        <Link
          href={"/"}
          className="block text-sm font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors py-2"
        >
          Home
        </Link>
      </li>
      <li key={"search"}>
        <Link
          href={"/search"}
          className="block text-sm font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors py-2"
        >
          Search
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={category.url}
            className="block text-sm font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors py-2"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </>
  );
}
