export function ArticleContentSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Image Skeleton */}
      <div className="mb-10">
        <div className="aspect-video w-full rounded-lg" />
        <div className="h-4 w-64 mt-3" />
      </div>

      {/* Article Body Skeleton */}
      <div className="space-y-6">
        {/* First paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-11/12" />
          <div className="h-5 w-4/5" />
        </div>

        {/* Second paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-3/4" />
        </div>

        {/* Subheading */}
        <div className="h-8 w-72 mt-10 mb-4" />

        {/* Third paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-5/6" />
          <div className="h-5 w-full" />
        </div>

        {/* Blockquote skeleton */}
        <div className="relative bg-muted/50 rounded-lg p-8 pl-16 border-l-4 border-accent/30 my-10">
          <div className="space-y-3">
            <div className="h-6 w-full" />
            <div className="h-6 w-11/12" />
            <div className="h-6 w-3/4" />
          </div>
        </div>

        {/* Fourth paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-2/3" />
        </div>

        {/* Another subheading */}
        <div className="h-8 w-56 mt-10 mb-4" />

        {/* Fifth paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-4/5" />
        </div>

        {/* List skeleton */}
        <div className="space-y-3 pl-6 my-6">
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full mt-2 shrink-0" />
            <div className="h-5 w-11/12" />
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full mt-2 shrink-0" />
            <div className="h-5 w-4/5" />
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full mt-2 shrink-0" />
            <div className="h-5 w-5/6" />
          </div>
        </div>

        {/* Final paragraph */}
        <div className="space-y-3">
          <div className="h-5 w-full" />
          <div className="h-5 w-full" />
          <div className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
}
