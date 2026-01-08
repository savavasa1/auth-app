import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your custom backend for authentication
        const res = await fetch(`${BACKEND_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials!.email,
            password: credentials!.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data) {
          return {
            id: data.Admin?.ID,
            email: data.Admin?.Email,
            accessToken: data.Bearer,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: { accessToken?: string; id?: string };
    }) {
      // When user signs in, save the accessToken to the JWT
      // console.log(user, user.accessToken);
      console.log("jwt callback", token, user);
      if (user) {
        token.accessToken = user.accessToken!;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
