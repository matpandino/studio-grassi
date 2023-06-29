import { Suspense } from 'react'
import ProductList from './components/products/ProductList'

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <Suspense fallback="loading">
        <ProductList />
      </Suspense>
    </main>
  )
}
