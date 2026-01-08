"use client";
import { getProductsAction } from "@/app/actions/product";
import React, { useEffect } from "react";

const ClientComponent = () => {
  useEffect(() => {
    getProductsAction().then((remoteProducts) => {
      console.log(remoteProducts);
    });
  }, []);

  console.log("client component");
  return <div>ClientComponent</div>;
};

export default ClientComponent;
