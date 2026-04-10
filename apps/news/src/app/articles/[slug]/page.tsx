import { getArticleBySlug } from "@/app/lib/article";
import { getRelatedArticles } from "@/app/lib/related-articles";
import { getSubscriptionStatusServer } from "@/app/lib/subscription-status-server";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { Taxonomy } from "@/components/taxonomy";
import { Calendar } from "lucide-react";
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
                  <figure className="mb-10">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary">
                      <img
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </figure>

                  {/* Article Body */}

                  {/* <div
                    className="prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80
          prose-strong:text-foreground prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
          prose-ul:my-6 prose-li:text-foreground prose-li:mb-2
          prose-img:rounded-lg
        "/> */}
                  {article.content?.length && (
                    <>
                      {article.content.map((block, index) => {
                        if (block.type === "paragraph") {
                          return (
                            <p
                              key={index}
                              className="text-foreground leading-relaxed mb-6"
                              dangerouslySetInnerHTML={{ __html: block.text }}
                            />
                          );
                        }
                        if (block.type === "paywall") {
                          return (
                            <div
                              key={index}
                              className="bg-primary/10 border border-primary/20 rounded-lg p-6"
                            >
                              <p className="text-foreground mb-4">
                                {block.text}
                              </p>
                              <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md transition-colors">
                                {block.cta}
                              </button>
                            </div>
                          );
                        }
                      })}
                    </>
                  )}
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
