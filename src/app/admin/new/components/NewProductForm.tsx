"use client";

import { Price, Input, TextArea } from "@/components/Inputs";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Name is required").max(500),
  price: z.string().nullish(),
  quantity: z.string().nullish(),
});

export type ProductFormType = z.infer<typeof formSchema>;

export default function NewProductForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ProductFormType> = (data) => {
    console.log(data);
  };

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
  );
}
