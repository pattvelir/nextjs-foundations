import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";
import { getBreakingNews } from "@/app/lib/breaking-news";
import { BreakingNews } from "./breaking-news";
import { Button } from "./ui/button";
import { HeaderMain } from "./header-main";

const breakingNews = await getBreakingNews(3);
console.log("breakingNews:", breakingNews);
const currentDate = new Date();
export function Header() {
  return (
    <header>
      {breakingNews && <BreakingNews articles={breakingNews} />}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <span>
            {currentDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">
              Subscribe
            </Link>
            <Link href="#" className="hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <HeaderMain />
    </header>
  );
}
