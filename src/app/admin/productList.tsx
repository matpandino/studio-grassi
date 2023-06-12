import { prisma } from "@/lib/prisma";
import React from "react";

const ProductList = async () => {
  const products = await prisma.product.findMany();

  return (
    <ol>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ol>
  );
};

export default ProductList;
