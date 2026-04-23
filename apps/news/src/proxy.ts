import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Initial check for subscription status. If no cookie exists,
  // we know that the user is not subscribed.
  const subscribedToken = request.cookies.get("subscriptionToken");
  console.log("proxy middleware start");

  // Continue to the route with added security headers
  const response = NextResponse.next();

  // If we have a subscription token cookie, we'll add a header to the request.
  if (subscribedToken) {
    response.headers.set("x-has-subscription-token", "true");
  }

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

// Configure which paths run the proxy
export const config = {
  matcher: ["/articles/:path*"],
};
