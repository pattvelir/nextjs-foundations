import { ArticleSearch } from "@/components/article-search";
import { getCategories } from "../lib/categories";
import { Suspense } from "react";
import type { Metadata } from "next";

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
  //const articles = await searchArticles(6);
  const categories = await getCategories();
  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleSearch categories={categories} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
