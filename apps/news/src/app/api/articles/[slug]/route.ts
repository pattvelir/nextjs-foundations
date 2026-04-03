import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Gets the article with the provided slug.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json(
      { error: "Failed to retrieve article. No slug was provided." },
      { status: 500 },
    );
  }

  const sql = neon(`${process.env.STORAGE_DATABASE_URL}`);
  const slugLower = slug.toLowerCase();

  try {
    const result = await sql`
    SELECT * FROM articles WHERE slug = ${slugLower}
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
