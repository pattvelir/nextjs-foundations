import { Skeleton } from "../ui/skeleton";

export function ArticleSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-20 lg:pb-0">
        <article className="container mx-auto px-4 py-8 lg:py-12 animate-pulse">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="mb-6">
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="mb-10">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-64 mt-3" />
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <Skeleton className="h-8 w-72 mt-10 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="relative bg-muted/50 rounded-lg p-8 pl-16 border-l-4 border-accent/30 my-10">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-11/12" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <Skeleton className="h-8 w-56 mt-10 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="space-y-3 pl-6 my-6">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2 shrink-0" />
                  <Skeleton className="h-5 w-11/12" />
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2 shrink-0" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2 shrink-0" />
                  <Skeleton className="h-5 w-5/6" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
