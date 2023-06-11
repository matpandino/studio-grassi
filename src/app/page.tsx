import { prisma } from "@/lib/prisma";
import ProductList from "./components/products/productList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <Suspense fallback="loading">
        <ProductList />
      </Suspense>
    </main>
  );
}
