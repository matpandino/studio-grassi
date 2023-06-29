import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export interface CreateImageDTO {
  fileKey: string
  fileUrl: string
}

export interface CreateProductDTO {
  name: string
  description?: string
  quantity: number
  price: number
  images: CreateImageDTO[]
}

export async function POST(request: NextRequest) {
  try {
    const body: Awaited<CreateProductDTO> = await request.json()

    await prisma.product.create({
      data: {
        ...body,
        images: {
          create: body.images,
        },
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create product', details: error },
      { status: 404 },
    )
  }
}
