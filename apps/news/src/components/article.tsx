import ArticleInner from "./article-inner";

type Props = {
  params: { slug: string };
};

export default async function Article({ params }: Props) {
  const { slug } = params;
  console.log("slug:", slug);
  return <ArticleInner slug={slug} />;
}
