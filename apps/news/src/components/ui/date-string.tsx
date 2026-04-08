"use client";

import { Article } from "@repo/models/article";

export function DateString({ article }: { article: Article | null }) {
  const date =
    typeof article?.datecreated === "string"
      ? new Date(article?.datecreated)
      : article?.datecreated;
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
