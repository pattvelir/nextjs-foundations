// todo: probably don't need this anymore.
"use client";

import { Article } from "@repo/models/article";

export function DateString({ article }: { article: Article | null }) {
  const date =
    typeof article?.publishedAt === "string"
      ? new Date(article?.publishedAt)
      : article?.publishedAt;
  return (
    <span>
      {date?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}
