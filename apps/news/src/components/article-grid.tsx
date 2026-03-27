import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Article {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

// todo: replace with dynamic articles
const articles: Article[] = [
  {
    category: "Politics",
    title: "Senate Passes Landmark Infrastructure Bill with Bipartisan Support",
    excerpt:
      "The comprehensive legislation aims to modernize transportation and expand broadband access across rural communities.",
    author: "Michael Torres",
    date: "Mar 20, 2026",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
  },
  {
    category: "Culture",
    title: "New Museum Exhibition Celebrates Indigenous Art Heritage",
    excerpt:
      "A groundbreaking collection showcases centuries of artistic tradition and contemporary indigenous voices.",
    author: "Lisa Park",
    date: "Mar 19, 2026",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
  },
  {
    category: "Science",
    title: "Breakthrough Discovery Could Transform Renewable Energy Storage",
    excerpt:
      "Researchers announce a new battery technology that could solve one of green energy's biggest challenges.",
    author: "David Kim",
    date: "Mar 19, 2026",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
  },
  {
    category: "Sports",
    title: "Historic Season Concludes with Championship Victory",
    excerpt:
      "The underdog team defied all expectations to claim their first title in over three decades.",
    author: "Rachel Green",
    date: "Mar 18, 2026",
    image:
      "https://images.unsplash.com/photo-1461896836934- voices08c2ee?w=600&h=400&fit=crop",
  },
  {
    category: "Health",
    title: "New Study Reveals Benefits of Mediterranean Diet for Mental Health",
    excerpt:
      "Research links traditional eating patterns to improved cognitive function and reduced anxiety.",
    author: "Dr. Anna Wells",
    date: "Mar 18, 2026",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    category: "Technology",
    title: "Smart Cities Initiative Expands to 50 New Urban Centers",
    excerpt:
      "The ambitious program brings AI-powered infrastructure to improve quality of life for millions.",
    author: "Chris Morgan",
    date: "Mar 17, 2026",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  },
];

export function ArticleGrid() {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Latest Stories
          </h2>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <Link href="#" key={index} className="group">
              <article className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground rounded mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
