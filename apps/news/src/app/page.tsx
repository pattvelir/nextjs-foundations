import { ArticleGrid } from "@/components/article-grid";
import { getLatestArticles } from "./lib/latest-articles";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { TrendingArticles } from "@/components/trending-articles";
import { getTrendingArticles } from "./lib/trending-articles";
import { getFeaturedArticles } from "./lib/featured-articles";
import { Hero } from "@/components/hero";

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles(6);
  const trendingArticles = await getTrendingArticles(4);
  const articles = await getLatestArticles(6);
  const featuredArticlesWithoutHero =
    featuredArticles?.slice(1, featuredArticles.length) || [];
  //console.log(articles);
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
