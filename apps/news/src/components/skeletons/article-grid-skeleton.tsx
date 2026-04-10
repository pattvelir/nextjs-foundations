export function ArticleCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      <div className="aspect-[16/10] bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-3 w-3 bg-muted rounded-full" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
