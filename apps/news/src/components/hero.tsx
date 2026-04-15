import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";
import { DateString } from "./ui/date-string";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";
import { ArticleCardSkeleton } from "./skeletons/article-grid-skeleton";
export function Hero({ article }: { article: Article | null }) {
  if (article) {
    return (
      <section className="relative">
        <Link href="/article" className="group block">
          <article className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-12 md:pb-16 lg:pb-20">
                <div className="max-w-4xl">
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded mb-6">
                    {article.category}
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-primary-foreground text-balance">
                    {article.title}
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 max-w-3xl line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-primary-foreground/80">
                    <span className="font-medium">
                      By {article.author.name}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>
                      <DateString article={article} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>
    );
  }
}
