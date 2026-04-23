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
  console.log("slug:", slug);

  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article could not be found.",
    };
  }

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

export default async function ArticlePage({ params }: Props) {
  const trendingArticles = await getTrendingArticles(4);
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
      <TrendingArticles articles={trendingArticles} />
    </Suspense>
  );
}
