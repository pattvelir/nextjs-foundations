import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Search, SearchSchema } from "@repo/models/requests/search";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Takes a search object and converts it to a query string for use in the url.
export function articleSearchToQueryString(search: Search | null) {
  if (typeof search === "undefined" || search == null) {
    return null;
  }
  const searchParams = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

// The inverse of articleSearchToQueryString, takes a query string and converts it to a search object.
export function queryStringToArticleSearch(searchParams: URLSearchParams) {
  return SearchSchema.safeParse(Object.fromEntries(searchParams.entries()));
}

export function getSearchTitle(search: Search | null) {
  if (!search) {
    return "Search";
  }
  if (search.search) {
    return `Search results for "${search.search}"`;
  } else if (search.category) {
    return `Articles in category "${search.category}"`;
  } else {
    return "Search";
  }
}
