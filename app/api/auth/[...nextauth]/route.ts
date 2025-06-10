import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Email from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client" // <-- ЭТА СТРОКА ДОЛЖНА БЫТЬ ТАКОЙ

const prisma = new PrismaClient()

// Логируем переменные окружения для отладки
console.log("AUTH_URL:", process.env.AUTH_URL)
console.log(
  "AUTH_SECRET (first 5 chars):",
  process.env.AUTH_SECRET ? process.env.AUTH_SECRET.substring(0, 5) : "Not set",
)
console.log("DISCORD_CLIENT_ID:", process.env.DISCORD_CLIENT_ID)
console.log("EMAIL_SERVER:", process.env.EMAIL_SERVER ? "Set" : "Not set")
console.log("EMAIL_FROM:", process.env.EMAIL_FROM ? "Set" : "Not set")

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
})
