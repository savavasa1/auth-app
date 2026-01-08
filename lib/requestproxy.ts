import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleRequest } from "@/lib/serversession";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const requestProxy = async (
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
) => {
  const { path } = await params;
  const session = await getServerSession(authOptions);
  return handleRequest(request, path, method, session);
};
