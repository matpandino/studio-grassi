import { Suspense } from "react";
import ProductList from "./components/ProductList";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/admin/new">New Product</Link>

      <div>page</div>
      <Suspense fallback="loading">
        <ProductList />
      </Suspense>
    </div>
  );
};

export default page;
