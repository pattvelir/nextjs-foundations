import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "../../lib/search-articles";
import { queryStringToArticleSearch } from "@/app/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsedQueryString = queryStringToArticleSearch(searchParams);
  if (!parsedQueryString.success) {
    return NextResponse.json(
      { error: "Invalid search parameters" },
      { status: 400 },
    );
  }
  const results = await searchArticles(parsedQueryString.data);

  return NextResponse.json(results);
}
