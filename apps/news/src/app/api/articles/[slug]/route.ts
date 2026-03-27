import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Gets the article with the provided slug.
export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  if (!params || !params.slug) {
    return NextResponse.json(
      { error: "Failed to retrieve article. No slug was provided." },
      { status: 500 },
    );
  }

  const sql = neon(`${process.env.STORAGE_DATABASE_URL}`);
  const slug = params.slug.toLowerCase();

  try {
    const result = await sql`
    SELECT * FROM articles WHERE slug = ${slug}
  `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Failed to retrieve article. No article was found with the provided slug: " +
          err,
      },
      { status: 500 },
    );
  }
}
