"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { skus: { include: { images: true } } };
}>;

interface ProductItemProps {
  product: ProductWithImages;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const productFirstSku = product.skus?.[0] || null;

  if (!productFirstSku) return null;

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={
            product.skus[0]?.images[0]?.fileUrl ||
            "https://picsum.photos/200/300"
          }
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
        <p className="text-sm font-medium text-gray-900">
          {product.skus[0].price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
