import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await prisma.product.create({
      data: JSON.parse(req.body),
    });
    res.status(201)
    res.end()
  } else {
    res.status(404).json({ message: "Failed to create product" });
  }
}
