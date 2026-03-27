// app/api/articles/route.ts

import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { ArticleSchema } from "@repo/models/article";
import { generateSlug } from "@/app/lib/articles";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = ArticleSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: "Provided article data was invalid." },
        { status: 400 },
      );
    }

    const { title, author, body } = parsed.data;

    if (!title || !author || !body) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Generate a slug for the article.
    const slug = generateSlug(title);

    const sql = neon(`${process.env.STORAGE_DATABASE_URL}`);

    // Create article command.
    const result = await sql`
      INSERT INTO articles (title, author, body, slug)
      VALUES (${title}, ${author}, ${body}, ${slug})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create article. Error: " + err },
      { status: 500 },
    );
  }
}
