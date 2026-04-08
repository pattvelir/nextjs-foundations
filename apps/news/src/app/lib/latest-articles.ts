import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getLatestArticles(
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 10 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.
  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const result = await sql`
    SELECT 
      a.*,
      COALESCE(vc.view_count, 0) AS view_count,
      t.id AS tag_id,
      t.slug AS tag_slug,
      t.name AS tag_name
    FROM (
      SELECT *
      FROM articles
      ORDER BY datecreated DESC
      LIMIT ${validatedCount}
    ) a
    LEFT JOIN articletags at ON at.articleid = a.id
    LEFT JOIN tags t ON t.id = at.tagid
    LEFT JOIN (
      SELECT articleid, COUNT(*)::INT AS view_count
      FROM articleviews
      GROUP BY articleid
    ) vc ON vc.articleid = a.id
    ORDER BY a.datecreated DESC;
  `;

  type ArticleInput = z.input<typeof ArticleSchema>;

  const map = new Map<number, ArticleInput>();

  for (const row of result) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        slug: row.slug,
        title: row.title,
        author: row.author,
        body: row.body,
        datecreated: row.datecreated,
        image: row.image,
        category: row.category,
        views: row.view_count,
        isbreakingnews: row.isbreakingnews,
        tags: [],
      });
    }

    if (row.tag_id) {
      map.get(row.id)!.tags!.push({
        id: row.tag_id,
        slug: row.tag_slug,
        name: row.tag_name,
      });
    }
  }

  const articles = Array.from(map.values());

  // Make sure we have at least 1 article.
  if (!result[0]) return null;
  console.log("latest results:", articles);
  return z.array(ArticleSchema).parse(articles);
}
