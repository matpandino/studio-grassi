"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

interface ProductItemProps {
  product: ProductWithImages;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.images[0]?.fileUrl ||  "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-03.jpg"}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">white</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
