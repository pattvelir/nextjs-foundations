import { ArticleGrid } from "@/components/article-grid";
import { getLatestArticles } from "./lib/latest-articles";

export default async function HomePage() {
  const articles = await getLatestArticles(5);
  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ArticleGrid articles={articles} />
      </main>
    </div>
  );
}
