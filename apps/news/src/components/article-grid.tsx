import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";
import { DateString } from "./ui/date-string";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";

export function ArticleGrid({
  articles,
  title,
}: {
  articles: Article[] | null;
  title?: string;
}) {
  if (articles) {
    return (
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <Link href={article.url} key={index} className="group">
                <article className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <Taxonomy article={article} />
                    <h3 className="font-serif text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {/* {article.excerpt} */}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {article?.isbreakingnews && <BreakingNewsEmblem />}
                      </span>
                      <span className="font-medium">{article.author}</span>
                      <span>•</span>
                      <DateString article={article} />
                      <span>•</span>
                      <span>
                        {article.views}{" "}
                        {(article.views ?? 0) == 1 ? "view" : "views"}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <div>No articles found.</div>;
}
