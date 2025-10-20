// auth.config.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise, { databaseName: "kaizanshop" }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = creds?.email?.toLowerCase().trim();
        const password = creds?.password ?? "";
        if (!email || !password) return null;

        const db = (await clientPromise).db("kaizanshop");
        const user = await db
          .collection("user_credentials")
          .findOne(
            { email },
            { projection: { _id: 1, email: 1, name: 1, passwordHash: 1 } }
          );

        if (!user) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  pages: { signIn: "/auth/signin", error: "/auth/signin" },
 callbacks: {
    async jwt({ token, user }) {
      // Khi đăng nhập, đối tượng 'user' sẽ có sẵn
      // 'user.id' đã được MongoAdapter tự động map từ '_id'
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Gán 'id' từ token vào 'session.user.id'
      // Đảm bảo rằng session.user là một đối tượng
      if (session.user) {
        session.user.id = token.id as string; // 'token.id' là cái chúng ta đã gán ở callback 'jwt'
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  
};
