import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Email from "next-auth/providers/email" // Import Email provider
import { PrismaAdapter } from "@auth/prisma-adapter" // Assuming you will use Prisma for database adapter
import { PrismaClient } from "@prisma/client" // Assuming you have Prisma client

const prisma = new PrismaClient() // Initialize Prisma Client

// Логируем переменные окружения для отладки
console.log("AUTH_URL:", process.env.AUTH_URL)
console.log(
  "AUTH_SECRET (first 5 chars):",
  process.env.AUTH_SECRET ? process.env.AUTH_SECRET.substring(0, 5) : "Not set",
)
console.log("DISCORD_CLIENT_ID:", process.env.DISCORD_CLIENT_ID)
console.log("EMAIL_SERVER:", process.env.EMAIL_SERVER ? "Set" : "Not set") // Log email server status
console.log("EMAIL_FROM:", process.env.EMAIL_FROM ? "Set" : "Not set") // Log email from status

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // Use Prisma as the database adapter
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // console.log("Auth.js Callback: session", { session, token }) // Отключено для продакшена
      if (session.user) {
        session.user.id = token.sub as string
        // You might want to fetch user role/application status from your DB here
        // For now, we'll rely on the profile page to fetch it.
      }
      return session
    },
    async jwt({ token, user }) {
      // console.log("Auth.js Callback: jwt", { token, user }) // Отключено для продакшена
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth", // Custom sign-in page
    verifyRequest: "/auth/verify-request", // Page to show after email sign-in link is sent
    error: "/auth/error", // Custom error page for authentication
  },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  // debug: false, // Отключено для продакшена
})
