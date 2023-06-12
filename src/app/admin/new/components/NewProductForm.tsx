import { Price, Input, TextArea } from "@/components/Inputs";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function NewProductForm() {
  return (
    <form>
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
              <Input id="name" name="name" labelContent="Nome" />
            </div>

            <div className="col-span-full">
              <TextArea
                id="description"
                name="description"
                labelContent="Descrição"
              />
            </div>

            <div className="sm:col-span-3">
              <Price id="price" name="price" labelContent="Preço" />
            </div>

            <div className="sm:col-span-3">
              <Input
                id="quantity"
                name="quantity"
                labelContent="Quantidade"
                type="number"
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
