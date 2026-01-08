import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function fetchFromBackend(
  path: string[],
  method: string,
  session: Session | null,
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    searchParams?: string;
  } = {}
) {
  if (!session || !session.accessToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized - Please sign in" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const backendPath = path.join("/");
  const url = `${BACKEND_URL}/${backendPath}${
    options.searchParams ? `?${options.searchParams}` : ""
  }`;

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}

export async function handleRequest(
  request: NextRequest,
  path: string[],
  method: string,
  session: Session | null
) {
  try {
    const searchParams = request.nextUrl.searchParams.toString();

    let body = undefined;
    if (method !== "GET" && method !== "DELETE") {
      try {
        body = await request.json();
      } catch {
        // No body
      }
    }

    const response = await fetchFromBackend(path, method, session, {
      body,
      searchParams,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Backend proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
