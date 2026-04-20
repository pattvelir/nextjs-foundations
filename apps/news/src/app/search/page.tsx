import { ArticleSearch } from "@/components/article-search";
import { getCategories } from "../lib/categories";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticleSearchSkeleton } from "@/components/skeletons/article-search-skeleton";
import { getLatestArticles } from "../lib/latest-articles";

export const metadata: Metadata = {
  title: "Vercel Daily News | Search",
  description:
    "Search for the latest news about Vercel in various different categories.",
  openGraph: {
    title: "Vercel Daily News | Search",
    description:
      "Search for the latest news about Vercel in various different categories.",
    type: "website",
  },
};
export default async function SearchPage() {
  const [categories, defaultArticles] = await Promise.all([
    getCategories(),
    getLatestArticles(5),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <Suspense fallback={<ArticleSearchSkeleton />}>
            <ArticleSearch
              categories={categories}
              defaultArticles={defaultArticles}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
