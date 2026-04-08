import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function searchArticles(query: string): Promise<Article[] | null> {
  const result = await sql`
    SELECT *,
      ts_rank(search_vector, plainto_tsquery(${query})) AS rank
    FROM articles
    WHERE search_vector @@ plainto_tsquery(${query})
    ORDER BY rank DESC
    LIMIT 20;
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
        views: row.views,
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
  console.log("result:", articles);
  return z.array(ArticleSchema).parse(articles);
}
