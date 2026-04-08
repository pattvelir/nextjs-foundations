import { ArticleSearch } from "@/components/article-search";

export default async function SearchPage() {
  //const articles = await searchArticles(6);

  //console.log(articles);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div>
          <ArticleSearch />
        </div>
      </main>
    </div>
  );
}
