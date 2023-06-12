import NewProductForm from "./components/NewProductForm";

export default function Page() {
  return (
    <main className="flex w-full justify-center mt-10">
      <div className="md:max-w-5xl md:flex-1">
        <NewProductForm />
      </div>
    </main>
  );
}
