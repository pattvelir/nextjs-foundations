// Generates an article slug based on the article's title.
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
}
