"use client";

import { Article } from "@repo/models/article";
import { useState, useEffect, useRef } from "react";
import { ArticleGrid } from "./article-grid";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleGridHeader } from "./article-grid-header";
import { Input } from "./ui/input";
import { SearchSchema } from "@repo/models/requests/search";
import {
  articleSearchToQueryString,
  getSearchTitle,
  queryStringToArticleSearch,
} from "@/app/lib/utils";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Category } from "@repo/models/category";

export function ArticleSearch({
  categories,
}: {
  categories: Category[] | null;
}) {
  const searchParams = useSearchParams();
  const request = queryStringToArticleSearch(searchParams);
  const title = getSearchTitle(request?.data ?? null);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const search = request.data?.search ?? "";
  const category = request.data?.category ?? "";

  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(search);

  // Handles changes to the keyword search input and category dropdown.
  const handleSearchChange = (searchValue: string, categoryValue: string) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    if (categoryValue) {
      params.set("category", categoryValue);
    } else {
      params.delete("category");
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const request = SearchSchema.parse({
      limit: 10,
      search: search || undefined,
      category: category || undefined,
    });

    const queryString = articleSearchToQueryString(request);

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/search?${queryString}`);
      const data = await res.json();

      setResults(data);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearchChange(inputValue, category);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, category]);

  const displayedResults = search || category ? results : [];

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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="border-0 bg-transparent pl-12 pr-24 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
              />
              <div className="absolute right-2 flex items-center gap-2">
                {search && (
                  <button
                    onClick={() => handleSearchChange("", category)}
                    className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
                {categories && (
                  <Select
                    defaultValue={category}
                    onValueChange={(value) => handleSearchChange(search, value)}
                  >
                    <SelectTrigger className="bg-transparent text-sm font-medium text-foreground border-0 focus:outline-none focus:ring-0 cursor-pointer pr-2 py-2 appearance-none">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {displayedResults && displayedResults.length > 0 ? (
        <ArticleGrid
          articles={displayedResults}
          title={title}
          loading={isLoading}
        />
      ) : isLoading ? (
        <ArticleGrid articles={[]} title={title} loading={true} />
      ) : (
        <p className="text-center text-muted-foreground mt-8">
          {search || category
            ? "No results found. Please try a different search term and/or category."
            : "Use the search box above to find articles. You can also filter by category if you wish."}
        </p>
      )}
    </>
  );
}
