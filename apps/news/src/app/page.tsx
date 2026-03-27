import { ArticleGrid } from "@/components/article-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ArticleGrid />
      </main>
    </div>
  );
}
