import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const [result] = await Promise.all([
    sql`SELECT * FROM articles WHERE slug = ${slug}`,
  ]);

  if (!result[0]) return null;

  // Increase view count for the article.
  await sql`
  INSERT INTO articleviews (articleid)
  VALUES (${result[0].id})
`;
  return ArticleSchema.parse(result[0]);
}
