import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete product', details: error },
      { status: 404 },
    )
  }
}
