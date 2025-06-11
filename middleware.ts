import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth",
  },
})

export const config = {
  matcher: [
    "/application/:path*",
    "/profile/:path*",
    "/donate/:path*",
  ],
} 