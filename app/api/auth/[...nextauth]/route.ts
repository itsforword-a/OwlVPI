import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import Email from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// Log environment variables for debugging
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL)
console.log("DISCORD_CLIENT_ID:", process.env.DISCORD_CLIENT_ID)
console.log("DISCORD_CLIENT_SECRET:", process.env.DISCORD_CLIENT_SECRET)

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email",
          prompt: "consent",
        },
      },
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user, account, profile })
      return true
    },
    async session({ session, user }) {
      console.log("Session callback:", { session, user })
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT callback:", { token, user, account, profile })
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
