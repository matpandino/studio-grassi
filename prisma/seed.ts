import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productData = [
  {
    name: "x 221",
    description: "This is product 1",
    slug: "produxact-1",
    categories: [{ name: "Cate32gory 1" }, { name: "Cat233egory 2" }],
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
        sku: "SKUasdas-1",
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
        sku: "SsadasKU-2",
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
