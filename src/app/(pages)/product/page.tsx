
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-green-700">
          সকল পণ্য
        </h1>

        <p className="mb-8 text-gray-600">
          আজকের বাজারের পণ্যের দাম দেখুন।
        </p>

        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-700">
              পণ্য লোড করা যাচ্ছে না।
            </p>
            <p className="mt-2 text-sm text-gray-500">
              API সংযোগ পরীক্ষা করুন অথবা পরে আবার চেষ্টা করুন।
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-green-700 underline"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={String(product.id)}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
