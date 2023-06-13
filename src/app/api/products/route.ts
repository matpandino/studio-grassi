import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await prisma.product.create({
      data: body,
    });

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product", details: error },
      { status: 404 }
    );
  }
}
