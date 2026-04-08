import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";
import { DateString } from "./ui/date-string";

export function ArticleGridHeader({ title }: { title?: string }) {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          {/* <Link
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link> */}
        </div>
      </div>
    </section>
  );
}
