export function Taxonomy({ category }: { category: string }) {
  return (
    <div>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-chart-4 text-accent-foreground rounded mb-4">
          {category}
        </span>
      </div>
    </div>
  );
}
