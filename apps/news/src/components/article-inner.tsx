import { getArticleBySlug } from "@/app/lib/article";
import { getRelatedArticles } from "@/app/lib/related-articles";
import { ArticleContent } from "@/components/article-content";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { Taxonomy } from "@/components/ui/taxonomy";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleContentSkeleton } from "@/components/skeletons/article-content-skeleton";

export default async function ArticleInner({ slug }: { slug: string }) {
  const article = await getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category ?? "", 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-20 lg:pb-0">
        <article className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            <header className="border-b border-border pb-8 mb-8">
              <div className="mb-6">
                {article?.category && <Taxonomy category={article.category!} />}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6 text-balance">
                {article.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div>
                    <Link
                      href="#"
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {article.author.name}
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-border" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {article.publishedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </header>
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                <div className="article-content">
                  {article.image && (
                    <figure className="mb-10">
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary">
                        <Image
                          width={1674}
                          height={972}
                          src={article.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </figure>
                  )}
                  <Suspense fallback={<ArticleContentSkeleton />}>
                    <ArticleContent content={article.content} />
                  </Suspense>
                </div>
                <ArticleGridHeader
                  title={"Related Articles in " + article.category}
                />
                <ArticleGrid articles={relatedArticles} />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
