'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { Product } from '@prisma/client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const router = useRouter()

  const deleteProduct = async () => {
    await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
    })
    router.refresh()
  }

  return (
    <li className="flex gap-2">
      {product.name}
      <button type="button" className="w-6" onClick={deleteProduct}>
        <TrashIcon color="red" />
      </button>
    </li>
  )
}

export default ProductItem
