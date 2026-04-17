import { getArticleBySlug } from "@/app/lib/article";
import { getRelatedArticles } from "@/app/lib/related-articles";
import { ArticleContent } from "@/components/article-content";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleGridHeader } from "@/components/article-grid-header";
import { Taxonomy } from "@/components/taxonomy";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleContentSkeleton } from "@/components/skeletons/article-content-skeleton";
import Article from "@/components/article";
import { ArticleSkeleton } from "@/components/skeletons/article-skeleton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
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

export default function ArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}
