import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // Protect all routes starting with `/admin`
  if (isAdminRoute(req)) {
    if (sessionClaims?.metadata?.role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
