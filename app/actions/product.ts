"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchFromBackend } from "@/lib/serversession";
import { getServerSession } from "next-auth";

export async function getProductsAction() {
  const session = await getServerSession(authOptions);
  const response = await fetchFromBackend(["product"], "GET", session);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
}
