import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { query } = req;
    const { id } = query;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
