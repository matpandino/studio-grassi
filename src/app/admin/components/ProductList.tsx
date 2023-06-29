import { prisma } from '@/lib/prisma'
import React from 'react'
import ProductItem from './ProductItem'

const ProductList = async () => {
  const products = await prisma.product.findMany()

  return (
    <ol>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ol>
  )
}

export default ProductList
