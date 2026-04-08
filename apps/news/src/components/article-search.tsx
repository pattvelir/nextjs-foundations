"use client";

import { Article } from "@repo/models/article";
import { useState, useEffect, useRef } from "react";
import { ArticleGrid } from "./article-grid";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleGridHeader } from "./article-grid-header";
import { Input } from "./ui/input";

export function ArticleSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(q);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Article[]>([]);
  const [title, setTitle] = useState("Search");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(async () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", query);
      router.push(`/search?${params.toString()}`);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setTitle(`Search results for "${query}"`);
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const displayedResults = query ? results : [];

  return (
    <>
      <ArticleGridHeader title={title} />
      <section className="py-8 md:py-12 bg-muted/50">
        <div ref={containerRef} className="w-full max-w-2xl mx-auto">
          <div className="relative">
            <div
              className={`relative flex items-center rounded-xl border-2 bg-card transition-all duration-200 ${
                isFocused
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="border-0 bg-transparent pl-12 pr-24 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </div>
      </section>
      {displayedResults && displayedResults.length > 0 ? (
        <ArticleGrid articles={displayedResults} title={title} />
      ) : (
        <p className="text-center text-muted-foreground mt-8">
          {query ? "No results found." : "Use the search box to find articles."}
        </p>
      )}
    </>
  );
}
