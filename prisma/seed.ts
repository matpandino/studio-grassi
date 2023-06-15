import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productData = [
  {
    name: "Product 1",
    description: "This is product 1",
    slug: "product-1",
    images: [
      {
        fileKey: "image-main-1",
        fileUrl: "https://picsum.photos/200/300",
      },
    ],
    categories: [{ name: "Category 1" }, { name: "Category 2" }],
    options: [
      {
        optionName: "Option 1",
        optionValues: [{ valueName: "Value 1" }, { valueName: "Value 2" }],
      },
      {
        optionName: "Option 2",
        optionValues: [{ valueName: "Value 3" }, { valueName: "Value 4" }],
      },
    ],
    skus: [
      {
        sku: "SKU-1",
        details: "SKU 1 details",
        price: 10,
        stockQuantity: 100,
        images: [
          {
            fileKey: "image-1",
            fileUrl: "https://picsum.photos/200/300",
          },
        ],
        skuValues: [
          {
            optionId: "option-id-1",
            optionValueId: "option-value-id-1",
          },
        ],
      },
      {
        sku: "SKU-2",
        details: "SKU 2 details",
        price: 15,
        stockQuantity: 50,
        images: [
          {
            fileKey: "image-2",
            fileUrl: "https://picsum.photos/200/300",
          },
        ],
        skuValues: [
          {
            optionId: "option-id-2",
            optionValueId: "option-value-id-2",
          },
        ],
      },
    ],
  },
];

async function seed() {
  for (const product of productData) {
    const { categories, options, skus, ...productInfo } = product;

    const createdProduct = await prisma.product.create({
      data: {
        ...productInfo,
        images: {
          create: productInfo.images,
        },
        categories: {
          create: categories,
        },
        options: {
          create: options.map((option) => ({
            ...option,
            optionValues: {
              create: option.optionValues,
            },
          })),
        },
        skus: {
          create: skus.map((sku) => ({
            ...sku,
            images: {
              create: sku.images,
            },
            skuValues: {
              create: sku.skuValues,
            },
          })),
        },
      },
      include: {
        categories: true,
        options: {
          include: {
            optionValues: true,
          },
        },
        skus: {
          include: {
            images: true,
            skuValues: true,
          },
        },
      },
    });

    console.log(`Created product with ID: ${createdProduct.id}`);
  }
}

seed()
