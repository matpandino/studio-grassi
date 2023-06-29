'use client'
import { Input } from '@/components/Inputs'

import { OurFileRouter } from '@/app/api/uploadthing/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadButton } from '@uploadthing/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Name is required').max(500),
  price: z.string().nullish(),
  quantity: z.string().nullish(),
  images: z.array(
    z.object({
      fileKey: z.string(),
      fileUrl: z.string(),
    }),
  ),
})

export type ProductFormType = z.infer<typeof formSchema>

export default function NewProductForm() {
  const router = useRouter()

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormType>({
    resolver: zodResolver(formSchema),
  })

  const images = watch('images')

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          price: data.price ? parseInt(data.price) : 0,
          quantity: data.quantity ? parseInt(data.quantity) : 0,
        }),
      })

      router.push('/admin')
    } catch (e) {
      console.log('error ', e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Novo Produto
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Criação de um novo produto
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <Input
                name="name"
                label="Nome"
                control={control}
                error={errors.name}
              />
            </div>

            <div className="col-span-full">
              <Input
                name="description"
                label="Descrição"
                control={control}
                error={errors.description}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="price"
                type="number"
                label="Preço"
                control={control}
                error={errors.price}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                name="quantity"
                type="number"
                label="Quantidade"
                control={control}
                error={errors.quantity}
              />
            </div>

            <div className="col-span-full">
              <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.length)
                    setValue(`images.${images?.length || 0}`, res[0])
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
            </div>

            {images?.map((image) => (
              <img key={image.fileKey} src={image.fileUrl} alt="product" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
