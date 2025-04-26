import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      // Add custom user properties here
      id: string;
      username?: string;
      role?: string;
    } & DefaultSession["user"]
  }
  interface User {
    // Add custom user properties here
      username?: string;
      role?: string;
  }
}