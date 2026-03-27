import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getLatestArticles(
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 10 articles to display.
  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const result = await sql`
    SELECT * FROM articles ORDER BY datecreated DESC LIMIT ${validatedCount}
  `;

  // Make sure we have at least 1 article.
  if (!result[0]) return null;
  console.log("result:", result);
  return z.array(ArticleSchema).parse(result);
}
