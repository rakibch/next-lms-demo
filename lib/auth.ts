// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { findUser } from "./users";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { username, password } = credentials;
        const user = findUser(username);
        if (!user) return null;
        if (user.password !== password) return null;
        // Return minimal user object
        return { id: user.id, name: user.name, username: user.username, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // attach role on first sign-in
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      // expose role to client
      (session as any).user = {
        ...(session as any).user,
        role: (token as any).role,
        id: (token as any).sub
      };
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
};
