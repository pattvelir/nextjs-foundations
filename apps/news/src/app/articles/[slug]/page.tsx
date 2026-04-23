import { getArticleBySlug } from "@/app/lib/article";
import { Suspense } from "react";
import Article from "@/components/article";
import { ArticleSkeleton } from "@/components/skeletons/article-skeleton";
import { getTrendingArticles } from "@/app/lib/trending-articles";
import { TrendingArticles } from "@/components/trending-articles";
import { preRenderArticles } from "@/app/lib/prerender-articles";

export async function generateStaticParams() {
  // Prerender articles based on the above search parameters.
  const articles = await preRenderArticles();

  if (articles) {
    return articles.map((articles) => ({
      slug: articles.slug,
    }));
  }
  return [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  console.log("slug:", slug);
  try {
    const article = await getArticleBySlug(slug);

    if (article != null) {
      return {
        title: article.title,
        description: article.excerpt ?? article.title,
        openGraph: {
          title: article.title,
          description: article.excerpt ?? article.title,
          images: article.image ? [article.image] : [],
          type: "article",
          publishedTime: article.publishedAt.toISOString(),
          authors: [article.author.name],
        },
      };
    }
  } catch (err: unknown) {
    console.log("error:", err);
    if (err instanceof Error && err.message === "NOT_FOUND") {
      return {
        title: "Article Not Found",
        description: "This article could not be found.",
      };
    }

    throw err;
  }
}

export default async function ArticlePage({ params }: Props) {
  const trendingArticles = await getTrendingArticles(4);
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
      <TrendingArticles articles={trendingArticles} />
    </Suspense>
  );
}
