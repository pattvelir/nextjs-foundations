import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getBreakingNews(
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 5 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.
  const validatedCount = count > 0 && count <= 5 ? count : 5;
  // Grab the latest breaking news article.
  const result = await sql`
    SELECT * FROM articles WHERE isbreakingnews = true ORDER BY datecreated DESC LIMIT ${validatedCount}
  `;

  // Make sure we have at least 1 article.
  if (!result[0]) return null;
  console.log("result:", result);
  return z.array(ArticleSchema).parse(result);
}
