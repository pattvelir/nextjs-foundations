import { Article, ArticleSchema } from "@repo/models/article";
import { apiFetch } from "./api";
import { getSubscriptionStatusServer } from "./subscription-status-server";
import { ContentBlock } from "@repo/models/content-block";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await apiFetch<Article>(`/articles/${slug}`);
  const subscriptionStatus = await getSubscriptionStatusServer();

  if (!article) return null;

  // Check subscription status.
  if (subscriptionStatus?.status !== "active") {
    // If the user isn't subscribed, we'll only return the first content block of the body.
    article.content = [article.content[0]];
    const paywallBlock: ContentBlock = {
      type: "paywall",
      text: "Subscribe to continue reading this article.",
      cta: "Subscribe Now",
    };
    article.content.push(paywallBlock);
  }

  return ArticleSchema.parse(article);
}
