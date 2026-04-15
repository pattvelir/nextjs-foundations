"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { HeaderNavigation } from "./header-navigation";
import { Category } from "@repo/models/category";

export function HeaderMain({ categories }: { categories: Category[] | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link href="/" className="flex-1 lg:flex-none text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              Vercel Daily News
            </h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?search=${encodeURIComponent(searchQuery)}`;
              }
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autoFocus={searchOpen}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" className="px-6">
              Search
            </Button>
          </form>
        </div>
      </div>
      <nav className="hidden lg:block border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3">
            <HeaderNavigation categories={categories} />
          </ul>
        </div>
      </nav>
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-card">
          <ul className="container mx-auto px-4 py-4 space-y-3">
            <HeaderNavigation categories={categories} />
          </ul>
        </nav>
      )}
    </>
  );
}
