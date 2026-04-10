import { ArticleSearch } from "@/components/article-search";
import { getCategories } from "../lib/categories";

export default async function SearchPage() {
  //const articles = await searchArticles(6);
  const categories = await getCategories();
  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <ArticleSearch categories={categories} />
        </div>
      </main>
    </div>
  );
}
