export { auth as middleware } from "@/auth"
export const runtime = "nodejs";

//With middleware, you can globally block pages (or groups of routes) from even loading unless logged in.

// middleware.ts
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/tripform",
    "/trip/:path*",
  ],
}