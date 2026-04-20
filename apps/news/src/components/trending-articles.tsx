import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Article } from "@repo/models/article";
import { Taxonomy } from "./ui/taxonomy";

export function TrendingArticles({ articles }: { articles: Article[] | null }) {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-6 w-6 text-accent" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Trending Now
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles?.map((article, index) => (
            <Link href={article.url} key={index} className="group">
              <article className="flex lg:flex-col gap-4 py-4 border-t border-border hover:border-accent transition-colors">
                <span className="font-serif text-4xl lg:text-5xl font-bold text-secondary">
                  {index + 1}
                </span>
                <div className="flex-1">
                  {article?.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
                      <Taxonomy category={article.category!} />
                    </span>
                  )}

                  <h3 className="font-serif text-base lg:text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
