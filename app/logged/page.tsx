import React from "react";
import { headers } from "next/headers";

const LoggedInPage = async () => {
  // Call through the Next.js API proxy which adds the token automatically
  const response = await fetch(
    `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/backend/product`,
    {
      cache: "no-store",
      headers: await headers(),
    }
  );

  if (response.ok) {
    const products = await response.json();
    console.log(products);
  } else {
    console.error("Failed to fetch products:", response.status);
  }

  return <div>You are logged in</div>;
};

export default LoggedInPage;
