import { Category, CategorySchema } from "@repo/models/category";
import { z } from "zod";
import { apiFetch } from "./api";

export async function getCategories(): Promise<Category[] | null> {
  const categories = await apiFetch<Category[]>(`/categories`);

  // Make sure we have at least 1 article.
  if (!categories[0]) return null;
  console.log("categories results:", categories);
  return z.array(CategorySchema).parse(categories);
}
