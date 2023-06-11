import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
        name: "product 1",
        price: 3300,
        quantity: 51,
    },
  });
  await prisma.product.create({
    data: {
        name: "product 2",
        price: 5500,
        quantity: 100,
    },
  });
  await prisma.product.create({
    data: {
        name: "product 3",
        price: 4400,
        quantity: 4,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });