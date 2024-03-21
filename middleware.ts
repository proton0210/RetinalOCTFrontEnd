import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/about"],
  ignoredRoutes: ["/api/webhook", "/api/getproducts", "api/stripewebhook"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
