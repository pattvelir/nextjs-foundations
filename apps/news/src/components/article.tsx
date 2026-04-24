import ArticleInner from "./article-inner";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Article({ params }: Props) {
  const { slug } = await params;
  return <ArticleInner slug={slug} />;
}
