import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "./options";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
