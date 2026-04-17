import { ArticleSearch } from "@/components/article-search";
import { getCategories } from "../lib/categories";
import { Suspense } from "react";

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
