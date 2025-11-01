import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo users (in real app, check from DB)
        const users = [
          { id: 1, username: "admin", password: "adminpass", role: "admin" },
          { id: 2, username: "student", password: "studentpass", role: "student" },
        ];

        const user = users.find(
          (u) =>
            u.username === credentials?.username &&
            u.password === credentials?.password
        );

        if (user) {
          // Return user object if valid
          return { id: user.id, name: user.username, role: user.role };
        } else {
          // Return null = invalid credentials
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret-key-for-demo",
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
