import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { Taxonomy } from "@repo/models/taxonomy";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getRelatedArticles(
  tags: Taxonomy[] | null,
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 10 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.

  if (!tags || tags.length === 0) return null;

  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const tagIds = tags.map((t) => t.id);

  const result = await sql`
  SELECT 
    a.*,
    t.id AS tag_id,
    t.slug AS tag_slug,
    t.name AS tag_name
  FROM articles a
  LEFT JOIN articletags at ON at.articleid = a.id
  LEFT JOIN tags t ON t.id = at.tagid
  WHERE EXISTS (
    SELECT 1
    FROM articletags at2
    WHERE at2.articleid = a.id
      AND at2.tagid = ANY(${tagIds})
  )
  ORDER BY a.datecreated DESC
  LIMIT ${validatedCount};
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
