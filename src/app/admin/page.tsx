import Link from 'next/link'
import { Suspense } from 'react'
import ShellContent from '../components/ShellContent'
import ProductList from './components/ProductList'

const page = () => {
  return (
    <ShellContent>
      <Link href="/admin/new">New Product</Link>

      <Suspense fallback="loading">
        <ProductList />
      </Suspense>
    </ShellContent>
  )
}

export default page
