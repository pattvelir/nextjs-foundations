import { Skeleton } from "../ui/skeleton";

export function ArticleCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      <Skeleton className="aspect-[16/10] " />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-4 rounded w-3/4" />
          <Skeleton className="h-4 rounded w-2/3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 rounded w-full" />
          <Skeleton className="h-3 rounded w-5/6" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}
