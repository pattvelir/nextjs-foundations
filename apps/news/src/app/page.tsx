import { ArticleGrid } from "@/components/article-grid";
import { getLatestArticles } from "./lib/latest-articles";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { TrendingArticles } from "@/components/trending-articles";
import { getTrendingArticles } from "./lib/trending-articles";
import { getFeaturedArticles } from "./lib/featured-articles";

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles(5);
  const trendingArticles = await getTrendingArticles(5);
  const articles = await getLatestArticles(6);

  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <ArticleGridHeader title="Featured" />
          <ArticleGrid articles={featuredArticles} />
          <TrendingArticles articles={trendingArticles} />
          <ArticleGridHeader title="Latest Articles" />
          <ArticleGrid articles={articles} />
        </div>
      </main>
    </div>
  );
}
