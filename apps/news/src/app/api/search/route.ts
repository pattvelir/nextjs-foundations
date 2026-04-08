import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "../../lib/search-articles";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await searchArticles(query);

  return NextResponse.json(results);
}
