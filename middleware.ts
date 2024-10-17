import { clerkMiddleware } from '@clerk/nextjs/server'

import { redirect } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/about"],
  ignoredRoutes: ["/api/webhook", "/api/getproducts", "/api/stripewebhook"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
