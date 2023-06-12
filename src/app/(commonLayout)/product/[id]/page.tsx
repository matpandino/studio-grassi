import { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ImageGallery from "@/app/components/ImageGallery";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

interface ProductPageParams {
  params: { id: string };
}

export async function generateStaticParams({ params }: ProductPageParams) {
  const products = await prisma.product.findMany();

  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function Product({ params }: ProductPageParams) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
  });

  if (!product) return notFound();

  const productImages = [
    "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-03.jpg",
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ImageGallery images={productImages} />

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: "description" }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div className="flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
