import { getArticleBySlug } from "@/app/lib/article";
import { getRelatedArticles } from "@/app/lib/related-articles";
import { getSubscriptionStatusServer } from "@/app/lib/subscription-status-server";
import { ArticleContent } from "@/components/article-content";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { Taxonomy } from "@/components/taxonomy";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSX } from "react/jsx-dev-runtime";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  console.log("slug: ", slug);
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
                {article?.category && (
                  <Link href="#">
                    <Taxonomy category={article.category!} />
                  </Link>
                )}
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
                  <ArticleContent content={article.content} />
                </div>
                <ArticleGridHeader title="Related Articles" />
                <ArticleGrid articles={relatedArticles} />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
