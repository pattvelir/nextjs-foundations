import { Category, CategorySchema } from "@repo/models/category";
import { z } from "zod";
import { apiFetch } from "./api";
import { cacheLife } from "next/cache";

export async function getCategories(): Promise<Category[] | null> {
  "use cache";
  cacheLife("hours");
  const categories = await apiFetch<Category[]>(`/categories`);

  // Make sure we have at least 1 category.
  if (!categories[0]) {
    return null;
  }

  return z.array(CategorySchema).parse(categories);
}
