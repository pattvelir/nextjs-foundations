import { getArticleBySlug } from "@/app/lib/article";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <h1>{article.title}</h1>
      <p>
        <strong>By {article.author}</strong>
      </p>
      <p>{article.body}</p>
    </div>
  );
}
