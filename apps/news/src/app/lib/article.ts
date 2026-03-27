import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const result = await sql`
    SELECT * FROM articles WHERE slug = ${slug}
  `;

  if (!result[0]) return null;

  return ArticleSchema.parse(result[0]);
}
