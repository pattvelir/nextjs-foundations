# Next.js Foundations Starter

A Turborepo monorepo starter for the Next.js Foundations certification course.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-foundations-starter)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run both apps in dev mode
pnpm dev

# Type check all packages
pnpm check-types

# Build all packages
pnpm build

# Format and lint
pnpm format
pnpm lint
```

## Project Structure

```
nextjs-foundations-starter/
├── apps/
│   ├── web/                    # Marketing site (localhost:3000)
│   └── blog/                   # Content hub (localhost:3001)
├── packages/
│   ├── ui/                     # Shared UI components
│   └── api/                    # Mock data layer (Faker)
├── turbo.json                  # Turborepo configuration
├── biome.jsonc                 # Biome linting/formatting
└── package.json
```

## Apps

- **web** (`apps/web`) - Marketing site running on port 3000
- **blog** (`apps/blog`) - Content hub running on port 3001

## Packages

- **@repo/ui** - Shared React components
- **@repo/api** - Mock data functions using Faker

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Linting and formatting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT

## Vercel Daily News Implementation

This repository contains my implementation of the Vercel Daily News assignment. Below are some details on the approach I took for each page/component.

### General

I started the implementation off of the Next.js Foundations repo used during the Next.js Foundations course. I created a new app under /news/. Most code for this implementation is found under /news/src, with the exception of the types/models, which I have placed under /packages/models for future reusability on other apps.

### Pages

The following pages were implemented:

#### Home Page


#### Article Page

Location: articles/[slug]/page.tsx

* Uses getArticleBySlug(slug) function to retrieve article data from the API.

### models

### components

### functions

I created a series of functions in order to retrieve/post/delete data to/from the API, as well as some that perform internal actions. I'll describe these below.

**Any functions that return data objects are first parsed through Zod to ensure type/property consistency. See Models section for more information.**

## api.ts (apiFetch function)

* Generic API fetch function that takes an endpoint path, method and headers as its parameters, then performs a request against the provided API, and returns the data.
* In cases where the endpoint request is valid, but returns a 404 (such as when looking up an expired subscription) null is returned.
* For other error states, an error is thrown instead.

## article.ts (getArticleBySlug function)

* Function for retrieving a specific article by the slug. A slug is passed through as the parameter, which is then concatenated to the endpoint path (/articles/) and passed to the **apiFetch** function to retrieve the article data from the API.
* Article is cached using "use cache"/cacheLife("hours") as presumably individual articles don't change all that frequently.
* Additionally, a request to **getSubscriptionStatusServer** is made to check to see if the user is subscribed.
	* If the user is subscribed, the article's content array is left alone and is returned with the rest of the article data as is.
	* If the user is not subscribed, or has unsubscribed, the content array is replaced with a single paywall content block, informing the user that they can subscribe to continue reading the article.
	
## breaking-news.ts (getBreakingNews function)
* Function for getting an article from the breaking news endpoint. Using **apiFetch**, the /breaking-news endpoint is hit.
* The breaking news article is cached using cacheLife("seconds") since breaking news can change quickly.

## categories.ts (getCategories function)
* Simple function for retrieving an array of all categories from the API. Using **apiFetch**, /categories is hit which returns the list of categories.
* Categories are cached using cacheLife("hours") as categories are likely not to change very often.

## featured-articles.ts (getFeaturedArticles function)
* Function that retrieves an array of articles that have their featured property set to true. 
* A Search object is created (used for any functions that hit the /articles endpoint) that sets featured to true, as well as the limit property to what was passed through for the number of articles to retrieve.
	* Per the requirements, 6 articles are retrieved from the component, though a max of 10 is set in the function to allow for some flexibility.
* Using **apiFetch**, /articles is requested. A query string, formatted from the Search object is appended to the request.
* Featured Articles are cached using cacheLife("hours"). This could be reduced to "minutes" based on preference, but I figured that these aren't likely changing too much.

## latest-articles.ts (getLatestArticles function)
* Function for getting an array of articles. Articles are returned from newest first, so no additional sorting was required.
* Similar to featured-articles.ts, although we're not checking against the featured property.
* Latest articles are cached using cacheLife("minutes") as new articles could be added more frequently than featured articles change, for example.

## related-articles.ts (getRelatedArticles function)
* Function for retrieving articles with a matching category to a provided article.
* Not listed as a requirement for the assignment, but an easy enough function to implement.
* Similar to the other functions that return an article array.
* Takes a category as an arguement and returns a list of articles that also have that category assigned.
* Related articles are cached using cacheLife("hours") because we're not too concerned about having up-to-date information here.

## search-articles.ts (searchArticles function)
* Function for retrieving an array of articles based on provided search parameters.
* As with the other article list-returning functions, this uses **apiFetch** to hit the /articles endpoint.
* A Search object is passed through to the function, containing the search properties such as the keyword (search property) and category.
* cacheLife("seconds") is used for fast repeat queries/deduped requests.

## trending-articles.ts (getTrendingArticles function)
* Function for retrieving an array of trending articles. Using **apiFetch**, the /articles/trending endpoint is hit.
* Trending articles are cached using cacheLife("minutes"), as these can likely change much more frequently than other article lists, but not as frequently as breaking news (seconds).

## subscribe.ts (subscribe function)

* Function for subscribing. Function is hit when a user tries to subscribe.
* Performs a post request to the internal /api/subscribe endpoint (api/subscribe/route.ts). 

## unsubscribe.ts (unsubscribe function)

### Internal API

I created an internal API to handle some functionality, such as subscribing and unsubscribing. This is used as an intermediary between the functions and the provided API.

## /api/subscribe/route.ts

 
