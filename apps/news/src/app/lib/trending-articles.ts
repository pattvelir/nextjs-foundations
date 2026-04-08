import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";

// Get the database connection.
const sql = neon(process.env.STORAGE_DATABASE_URL!);

export async function getTrendingArticles(
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 5 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.
  const validatedCount = count > 0 && count <= 5 ? count : 5;
  const result = await sql`
  SELECT 
    a.*,
    COUNT(av.articleid) AS view_count,
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id', t.id,
          'slug', t.slug,
          'name', t.name
        )
      ) FILTER (WHERE t.id IS NOT NULL),
      '[]'
    ) AS tags
  FROM articles a
  LEFT JOIN articletags at ON at.articleid = a.id
  LEFT JOIN tags t ON t.id = at.tagid
  LEFT JOIN articleviews av 
    ON a.id = av.articleid
    AND av.timestamp >= NOW() - INTERVAL '1 day'
  GROUP BY a.id
  ORDER BY view_count DESC
  LIMIT ${validatedCount};
`;

  type ArticleInput = z.input<typeof ArticleSchema>;

  const map = new Map<number, ArticleInput>();

  const articles = result.map((row) => ({
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
    tags: row.tags ?? [],
  }));

  // Make sure we have at least 1 article.
  if (!result[0]) return null;
  console.log("trending results:", articles);
  return z.array(ArticleSchema).parse(articles);
}
