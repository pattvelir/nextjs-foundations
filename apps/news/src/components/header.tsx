import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./ui/taxonomy";
import { getBreakingNews } from "@/app/lib/breaking-news";
import { BreakingNewsBanner } from "./breaking-news-banner";
import { Button } from "./ui/button";
import { HeaderMain } from "./header-main";
import { getCategories } from "@/app/lib/categories";
import { SubscriptionToggle } from "./ui/subscription-toggle";
import { Suspense } from "react";

const currentDate = new Date();
export async function Header() {
  const categories = await getCategories();
  return (
    <header>
      <Suspense fallback={""}>
        <BreakingNewsBanner />
      </Suspense>
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
            <Suspense fallback={<span>Loading...</span>}>
              <SubscriptionToggle cta={"Subscribe"} />
            </Suspense>
          </div>
        </div>
      </div>
      <HeaderMain categories={categories} />
    </header>
  );
}
