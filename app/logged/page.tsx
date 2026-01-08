import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchFromBackend } from "@/lib/serversession";

const LoggedInPage = async () => {
  const session = await getServerSession(authOptions);
  // Call backend directly
  const response = await fetchFromBackend(["product"], "GET", session);

  if (response.ok) {
    const products = await response.json();
    console.log(products);
  } else {
    console.error("Failed to fetch products:", response.status);
  }

  return <div>You are logged in</div>;
};

export default LoggedInPage;
