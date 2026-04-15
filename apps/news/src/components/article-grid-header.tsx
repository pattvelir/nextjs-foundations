export function ArticleGridHeader({ title }: { title?: string }) {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
