import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en-GB", "fr", "de", "ja"],
  defaultLocale: "en",
});

export default async function combinedMiddleware(req) {
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  const clerkResponse = clerkMiddleware(req);
  if (clerkResponse) {
    return clerkResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless fou
    "/(en-GB|fr|de|ja)/:path*",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
