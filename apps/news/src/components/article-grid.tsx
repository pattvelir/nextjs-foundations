import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";

export function ArticleGrid({ articles }: { articles: Article[] | null }) {
  if (articles) {
    return (
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Latest Articles
            </h2>
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

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
                      <span className="font-medium">{article.author}</span>
                      <span>•</span>
                      <span>
                        {article.datecreated.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{article.views} views</span>
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
