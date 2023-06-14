import ImageGallery from "@/app/(commonLayout)/components/products/ImageGallery";
import { prisma } from "@/lib/prisma";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

interface ProductPageParams {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function Product({ params }: ProductPageParams) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      skus: {
        include: {
          images: true,
        },
      },
    },
  });

  const defaultSku = product?.skus[0];

  if (!product) return notFound();

  const productImages = defaultSku
    ? defaultSku.images.map((image) => image.fileUrl)
    : [];

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

            {defaultSku?.price ? (
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {defaultSku?.price}
                </p>
              </div>
            ) : null}

            <div className="mt-6">
              <h3 className="sr-only">{product.description}</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
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
