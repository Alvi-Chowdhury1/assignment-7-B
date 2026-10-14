
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-green-700">
          সকল ক্যাটাগরি
        </h1>

        <p className="mb-8 text-gray-600">
          আপনার পছন্দের ক্যাটাগরি নির্বাচন করুন।
        </p>

        {categories.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-gray-600">
            কোনো ক্যাটাগরি পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const categoryData = category as typeof category & {
                slug?: string;
              };

              const categorySlug =
                categoryData.slug || String(category.id);

              return (
                <Link
                  key={String(category.id)}
                  href={`/category/${encodeURIComponent(categorySlug)}`}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.nameBn || category.name}
                  </h2>

                  <p className="mt-4 font-medium text-green-700">
                    পণ্য দেখুন →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
