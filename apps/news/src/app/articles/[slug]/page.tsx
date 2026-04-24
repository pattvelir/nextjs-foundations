import { getArticleBySlug } from "@/app/lib/article";
import { Suspense } from "react";
import Article from "@/components/article";
import { ArticleSkeleton } from "@/components/skeletons/article-skeleton";
import { getTrendingArticles } from "@/app/lib/trending-articles";
import { TrendingArticles } from "@/components/trending-articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

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
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return {
        title: "Article Not Found",
        description: "This article could not be found.",
      };
    }

    throw error;
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
