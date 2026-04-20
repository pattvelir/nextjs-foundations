import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-20 lg:pb-0">
        <article className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            <header className="border-b border-border pb-8 mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6 text-balance">
                Article not found
              </h1>
            </header>
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                <div className="article-content">
                  <p className="text-foreground leading-relaxed mb-6">
                    {
                      "We're sorry, but the article you're looking for could not be found. It may have been removed, had its name changed, or is temporarily unavailable."
                    }
                  </p>
                  <p className="text-foreground leading-relaxed mb-6">
                    Please check the URL for errors or try searching for the
                    article using the search bar above. If you believe this is
                    an error, please contact our support team.
                  </p>
                  <Link href="/" className="text-primary hover:underline">
                    Return to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
