## Vercel Daily News Implementation

This repository contains my implementation of the Vercel Daily News assignment. Below are some details on the approach I took for each page/component.

## General

I started the implementation off of the Next.js Foundations repo used during the Next.js Foundations course. I created a new app under /news/. Most code for this implementation is found under /news/src, with the exception of the types/models, which I have placed under /packages/models for future reusability on other apps.

## Layout

The layout.tsx handles the rendering of any global elements such as the header and footer.
* Default/fallback metadata exists that is later overwritten on pages.
* Layout renders the Header and Footer components, as well as a given page's components (children).

## Pages

The following pages were implemented. All pages use the same layout.tsx:

### Home Page (page.tsx)

* The homepage has basic metadata, similar to the fallback in layout.tsx.
* Various functions are called (which reach out to various api endpoints). These include:
	* getFeaturedArticles(6)
		* 6 featured articles are retrieved. The first is passed through to the Hero component, and the other 5 are passed through to the ArticleGrid component to display under the hero.
			* This is to avoid duplicating the first article in both components.
	* getTrendingArticles(4)
		* 4 trending articles are retrived and passed through to the TrendingArticles component.
	* getLatestArticles(6)
		* The latest 6 artciles are retrieved and passed through to the ArticleGrid component.
			* Note that no additional filtering is taking place here to exclude featured articles. This is to avoid confusion/be explicit about displaying the most recent articles.

### 404 Page (not-found.tsx)
* A generic 404 page explaining that the requested page could not be found, and includes a link to return to the homepage.

### Article Page (articles/[slug]/page.tsx)

* The article page. Takes the slug from the URL and passes it through to the getArticleBySlug(slug) function to retrieve article data from the API.
* If no matching article is found for the slug, the article 404 page is rendered.
* If an article was found, the article data is passed through to the Article component and displayed.
* Dynamic metadata is set up, which will take the properties from the retrieved article (such as title, image, etc.) and will apply them to the page's metadata.

### Article 404 Page (articles/[slug/not-found.tsx]

* The 404 page for articles.
* Displays text indicating that the requested article couldn't be found including a link to the homepage.

### Search Page (search/page.tsx)
* The search page.
* Retrieves categories using the getCategories function in order to display them in the category filter dropdown.
* Retrieves the latest 5 articles from the getlatestArticles function. This is used to display a series of articles when no search query/filters are applied.
* Categories and default articles are passed through to the ArticleSearch component.

## Models

I created various models/types for this assignment. For each model, I enforced types by making use of Zod. In each case, a schema object is defined, which is then exported using z.infer. For example:

export type Search = z.infer<typeof SearchSchema>;

### Request models
* search.ts
	* Model for performing search requests.
	* Query string parameters are converted into Search models and vice versa when performing search functions.

### General models
* article.ts
	* model for article responses.
	* Contains all properties retrieved from the article endpoint such as title, author, content, etc.
	* A computed/transformed property 'url' is created based on the article slug.
* author.ts
	* Model for author responses.
	* Contains the author's name and avatar.
* breaking-news.ts
	* Model for breaking news responses.
	* Contains data provided when hitting the breaking news endpoint.
	* A computed/transformed property 'url' is created based on the article ID.
* category.ts
	* Model for category responses.
	* Contains data provided when hitting the categories endpoint.
	* A computed/transformed property 'url' is created based on the category slug.
* content-block.ts
	* Model for representing an article's body content.
	* Several subtypes exist for each of the different types of content blocks.
		* paragraph
		* heading
		* block quote
		* unordered list
		* ordered list
		* image
		* paywall
			* This is a custom block used for generating the paywall CTA in articles when the user is not subscribed.
* subscription-status.tsx
	* Model for a subscription status response.
	* Contains the token for tracking the subscription (written to a cookie) as well as the status of the subscription.
	* Other unused properties exist from the response for future implementations.

## Components

I created a series of components for this assignment. These components make up the bulk of the website, and I've sorted them below based on what purpose they serve.

### UI Elements
* breaking-news-emblem.tsx
	* A simple "Breaking" emblem/bubble that appears next to the news title in the breaking news banner at the top of the page.
* button.tsx
	* A simple/generic button component used for displaying CTAs/buttons such as the subscribe and search buttons.
* date-string.tsx
	* A simple component to format and display an article's date.
* input.tsx
	* The input component for search bars.
* select.tsx
	* A component to handle a dropdown select. Used for selecting a category to filter against on the search page.
* subscription-submit-button.tsx
	* A wrapper component for Button for use when subscribing/unsubscribing/resubscribing.
* subscription-toggle.tsx
	* A component that handles subscribing/unsubscribing/resubscribing. Uses server actions to change the subscription state, and displays the current state to the user.
* taxonomy.tsx
	* A simple component for displaying the category name when displaying articles.

### Skeletons

I Created a subfolder for any skeleton components I used. These are used for displaying a loading state on various components.
* skeleton.tsx
	* The base skeleton component. A simple div with props that can be passed through to it. Used within all of the other skeleton components.
* article-card-skeleton.tsx
	* The skeleton for an article card (used on article grids). Displays while loading components such as search results, latest news, etc.
* article-content-skeleton.tsx
	* The skeleton for an article's body content. Used exclusively on the article page.
* article-search-skeleton.tsx
	* The skeleton displayed while loading the search page.
* 

### Layout components

These components are related to rendering the layout (header, footer, etc).

* footer.tsx
	* The footer component. Displays the copyright text and year.
* header-main.tsx
	* Renders the "main" section of the header, containing the menu/navigation, logo text and search button/input.
	* When the search button is clicked, a search input will appear. On submission, the keywords in the search input will be encoded into a query string, and then will navigate to the search page with the supplied query string.
* header-navigation.tsx
	* The header navigation component. Contains links for the homepage and search page, as well as links to pre-filtered category searches.
* header.tsx
	* The all-encompassing header component.
	* Renders the breaking news banner, inner header components and the subscription toggle component.

### News/Article components

The following components are related to displaying news.
* article-content.tsx
	* Displays the body content of an article.
	* Performs a check to see if the user is subscribed. 
		* If they are, the article content displays as normal. 
		* Otherwise, the article content is stripped except for it's first content block, and a paywall content block is appended containing a CTA to subscribe.
* article-grid-header.tsx
	* A simple header component that displays a provided title. Used above certain elements such as the latest news grid.
* article-grid.tsx
	* A component that displays a series of article cards.
	* Used on various sections of the site such as the latest news grid, the search results grid, and related news on article pages.
* article-inner.tsx
	* a component that displays the article content for a given article.
	* Displays the title, image, author, body content, etc for an article.
	* Runs the getArticleBySlug function to retrieve the article.
* article-search.tsx
	* A component that displays a title, search box, category selector and search button.
	* Allows users to search articles.
	* When a search is performed, the URL will update with the appropriate search keyword and filters.
	* If a user comes to the search page with a pre-defined query string, the values from the query string will populate the search input and category dropdown and will pre-filter the search.
	* When a search is performed, it hits the internal api/search endpoint with the provided search filters.
	* Search will automatically be performed when a user types at least 3 characters into the search box.
* article.tsx
	* A simple wrapper component that is displayed on the article pages.
	
	* Renders the ArticleInner component. The aritcle slug is passed through to ArticleInner in order to retrieve the correct article.
* breaking-news-banner-inner.tsx
	* A component that renders the breaking news banner at the top of the page.
	* Displays the title of the breaking news article as a link to the article.
	* Can be hidden by clicking the x. Will show again on the next page load.
* breaking-news-banner.tsx
	* A wrapper component for the breaking news banner.
	* Renders the BreakingNewsBannerInner component.
	* Hits the getBreakingNews function to retrieve the breaking news article.
* hero.tsx
	* The hero component that displays the first featured article.
	* Displays the title, image, author and summary text for the featured article.
* trending-articles.tsx
	* A component for displaying the trending articles.
	* Renders a list of provided articles similar to the article grid, but only displays the title (as a link to the article) and category.
	
## functions

I created a series of functions in order to retrieve/post/delete data to/from the API, as well as some that perform internal actions. I'll describe these below.

**Any functions that return data objects are first parsed through Zod to ensure type/property consistency. See Models section for more information.**

### api.ts (apiFetch function)

* Generic API fetch function that takes an endpoint path, method and headers as its parameters, then performs a request against the provided API, and returns the data.
* In cases where the endpoint request is valid, but returns a 404 (such as when looking up an expired subscription) null is returned.
* For other error states, an error is thrown instead.

### article.ts (getArticleBySlug function)

* Function for retrieving a specific article by the slug. A slug is passed through as the parameter, which is then concatenated to the endpoint path (/articles/) and passed to the **apiFetch** function to retrieve the article data from the API.
* Article is cached using "use cache"/cacheLife("hours") as presumably individual articles don't change all that frequently.
* Additionally, a request to **getSubscriptionStatusServer** is made to check to see if the user is subscribed.
	* If the user is subscribed, the article's content array is left alone and is returned with the rest of the article data as is.
	* If the user is not subscribed, or has unsubscribed, the content array is replaced with a single paywall content block, informing the user that they can subscribe to continue reading the article.
	
### breaking-news.ts (getBreakingNews function)
* Function for getting an article from the breaking news endpoint. Using **apiFetch**, the /breaking-news endpoint is hit.
* The breaking news article is cached using cacheLife("seconds") since breaking news can change quickly.

### categories.ts (getCategories function)
* Simple function for retrieving an array of all categories from the API. Using **apiFetch**, /categories is hit which returns the list of categories.
* Categories are cached using cacheLife("hours") as categories are likely not to change very often.

### featured-articles.ts (getFeaturedArticles function)
* Function that retrieves an array of articles that have their featured property set to true. 
* A Search object is created (used for any functions that hit the /articles endpoint) that sets featured to true, as well as the limit property to what was passed through for the number of articles to retrieve.
	* Per the requirements, 6 articles are retrieved from the component, though a max of 10 is set in the function to allow for some flexibility.
* Using **apiFetch**, /articles is requested. A query string, formatted from the Search object is appended to the request.
* Featured Articles are cached using cacheLife("hours"). This could be reduced to "minutes" based on preference, but I figured that these aren't likely changing too much.

### latest-articles.ts (getLatestArticles function)
* Function for getting an array of articles. Articles are returned from newest first, so no additional sorting was required.
* Similar to featured-articles.ts, although we're not checking against the featured property.
* Latest articles are cached using cacheLife("minutes") as new articles could be added more frequently than featured articles change, for example.

### related-articles.ts (getRelatedArticles function)
* Function for retrieving articles with a matching category to a provided article.
* Not listed as a requirement for the assignment, but an easy enough function to implement.
* Similar to the other functions that return an article array.
* Takes a category as an arguement and returns a list of articles that also have that category assigned.
* Related articles are cached using cacheLife("hours") because we're not too concerned about having up-to-date information here.

### search-articles.ts (searchArticles function)
* Function for retrieving an array of articles based on provided search parameters.
* As with the other article list-returning functions, this uses **apiFetch** to hit the /articles endpoint.
* A Search object is passed through to the function, containing the search properties such as the keyword (search property) and category.
* cacheLife("seconds") is used for fast repeat queries/deduped requests.

### trending-articles.ts (getTrendingArticles function)
* Function for retrieving an array of trending articles. Using **apiFetch**, the /articles/trending endpoint is hit.
* Trending articles are cached using cacheLife("minutes"), as these can likely change much more frequently than other article lists, but not as frequently as breaking news (seconds).

### Server actions

I originally created an internal API to handle some functionality, such as subscribing and unsubscribing. I then decided to convert these into server actions to follow suit with what was described in the Next.js Foundations course.

## actions.ts
* Contains the following server actions:
	* toggleSubscription
		* Contains logic for determining what state a user in in subscription-wise. Calls appropriate server action to either subscribe, unsubscribe, or create a new subscription.
		* toggleSubscription is called from subscription-toggle.tsx when the user clicks the Subscribe/Unsubscribe/Resubscribe button either in the header or in the body of a given article.
	* createSubscription
		* Creates a new subscription by hitting the /subscription/create endpoint, then calls the subscribe server action to activate the subscription.
	* subscribe
		* Activates the provided subscription and creates a new cookie containing the subscription token.
	* unsubscribe
		* Deactivates the provided subscription. Cookie remains in place in case the user wants to resubscribe.
	* getSubscriptionStatus
		* Grabs the subscription token from the cookie and attempts to retrieve and return a valid subscription object.
		

## /api/subscribe/route.ts

 
