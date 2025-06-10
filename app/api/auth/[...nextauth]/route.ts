import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

if (!process.env.DISCORD_CLIENT_ID) {
  throw new Error("DISCORD_CLIENT_ID is not set")
}

if (!process.env.DISCORD_CLIENT_SECRET) {
  throw new Error("DISCORD_CLIENT_SECRET is not set")
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set")
}

console.log("Initializing NextAuth with Discord provider...")
console.log("Client ID:", process.env.DISCORD_CLIENT_ID)
console.log("Redirect URI:", "https://owlvpi.vercel.app/api/auth/callback/discord")

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify email",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn attempt:", { user, account, profile })
      return true
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token })
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account })
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  events: {
    async signIn(message) {
      console.log("SignIn event:", message)
    },
    async signOut(message) {
      console.log("SignOut event:", message)
    },
    async error(message) {
      console.error("Auth error:", message)
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,
  debug: true,
})

export { handler as GET, handler as POST }
