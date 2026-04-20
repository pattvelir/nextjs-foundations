import { ArticleGrid } from "@/components/article-grid";
import { getLatestArticles } from "./lib/latest-articles";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { TrendingArticles } from "@/components/trending-articles";
import { getTrendingArticles } from "./lib/trending-articles";
import { getFeaturedArticles } from "./lib/featured-articles";
import { Hero } from "@/components/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vercel Daily News",
  description: "24/7 news about Vercel and the web development industry.",
  openGraph: {
    title: "Vercel Daily News",
    description: "24/7 news about Vercel and the web development industry.",
    type: "website",
  },
};

export default async function HomePage() {
  const [featuredArticles, trendingArticles, articles] = await Promise.all([
    getFeaturedArticles(6),
    getTrendingArticles(4),
    getLatestArticles(6),
  ]);

  const featuredArticlesWithoutHero =
    featuredArticles?.slice(1, featuredArticles.length) || [];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          {featuredArticles && featuredArticles.length > 0 && (
            <Hero article={featuredArticles[0]} />
          )}
          <ArticleGridHeader title="Featured Articles" />
          <ArticleGrid articles={featuredArticlesWithoutHero} />
          <TrendingArticles articles={trendingArticles} />
          <ArticleGridHeader title="Latest Articles" />
          <ArticleGrid articles={articles} />
        </div>
      </main>
    </div>
  );
}
