import Link from "next/link";
import { Article } from "@repo/models/article";
import { Taxonomy } from "./ui/taxonomy";
import { DateString } from "./ui/date-string";
import { ArticleCardSkeleton } from "./skeletons/article-card-skeleton";
import Image from "next/image";

export function ArticleGrid({
  articles,
  title,
  loading = false,
}: {
  articles: Article[] | null;
  title?: string;
  loading?: boolean;
}) {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading &&
            Array.from({ length: 6 }).map((article, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          {!loading &&
            articles?.map((article, index) => (
              <Link href={article.url} key={index} className="group">
                <article className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        width={1674}
                        height={972}
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {article?.category && (
                      <Taxonomy category={article.category!} />
                    )}
                    <h3 className="font-serif text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">
                        {article.author?.name}
                      </span>
                      <span>•</span>
                      <DateString article={article} />
                      <span>•</span>
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
