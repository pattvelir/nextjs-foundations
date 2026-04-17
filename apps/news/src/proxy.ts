import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Initial check for subscription status. If no cookie exists,
  // we know that the user is not subscribed.
  const subscribedToken = request.cookies.get("subscriptionToken");
  console.log("proxy middleware start");
  if (!subscribedToken) {
    console.log("no subscription token found, redirecting to preview mode");
    const url = request.nextUrl.clone();
    url.searchParams.set("preview", "true");
    console.log("new URL:", url.toString());
    return NextResponse.rewrite(url);
  }

  // Continue to the route with added security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

// Configure which paths run the proxy
export const config = {
  matcher: ["/articles/:path*"],
};
