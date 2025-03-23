// src/lib/auth/authOptions.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/lib/services/auth-service";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/signin',        // Changed from /auth/signin
    error: '/signin',         // Changed from /auth/signin
    verifyRequest: '/verify-otp', // Changed from /auth/verify-otp
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await authService.verifyCredentials(
          credentials.identifier,
          credentials.password
        );

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLoginAt: new Date(),
            lastLoginDevice: credentials.userAgent || 'unknown',
          },
        });

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};