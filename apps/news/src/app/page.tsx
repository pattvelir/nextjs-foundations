import { ArticleGrid } from "@/components/article-grid";
import { getLatestArticles } from "./lib/latest-articles";

export default async function HomePage() {
  const articles = await getLatestArticles(6);

  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <ArticleGrid articles={articles} />
        </div>
      </main>
    </div>
  );
}
