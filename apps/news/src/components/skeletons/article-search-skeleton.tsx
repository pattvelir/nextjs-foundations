import { Skeleton } from "./skeleton";

export function ArticleSearchSkeleton() {
  return (
    <>
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <Skeleton className="flex items-center justify-between" />
        </div>
      </section>
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="w-full max-w-2xl mx-auto">
          <Skeleton className="relative flex items-center rounded-xl h-12 w-full" />
        </div>
      </section>
    </>
  );
}
