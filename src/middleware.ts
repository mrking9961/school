import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

// if (process.env.NODE_ENV !== "production") {
//   console.log("Route matchers:", matchers);
// }

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();

  if (!sessionClaims) return; // Allow public routes

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  // console.log("User role:", role); 
 // console.log("Session claims:", sessionClaims); 
  for (const { matcher, allowedRoles } of matchers) {
  //  if (matcher(req) && (!role || !allowedRoles.includes(role))) {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  //    }
  }
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
