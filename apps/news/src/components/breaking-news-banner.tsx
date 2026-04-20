import { BreakingNewsBannerInner } from "./breaking-news-banner-inner";
import { getBreakingNews } from "@/app/lib/breaking-news";

export async function BreakingNewsBanner() {
  const breakingNews = await getBreakingNews();

  return <BreakingNewsBannerInner breakingNews={breakingNews} />;
}
