
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function normalize(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function makeSlug(value: unknown): string {
  return normalize(value)
    .replace(/[^a-z0-9\u0080-\uFFFF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryIdentifiers(category: Category): string[] {
  return [
    category.id,
    category._id,
    category.slug,
    category.name,
    category.nameBn,
  ]
    .filter((value) => value !== undefined && value !== null)
    .flatMap((value) => [normalize(value), makeSlug(value)])
    .filter(Boolean);
}

function productMatchesCategory(
  product: Product,
  category: Category
): boolean {
  const record = product as unknown as Record<string, unknown>;
  const identifiers = new Set(getCategoryIdentifiers(category));
  const values: unknown[] = [
    record.categoryId,
    record.categorySlug,
    record.categoryName,
    record.categoryNameBn,
    record.category,
  ];

  const categoryValue = record.category;

  if (
    categoryValue !== null &&
    typeof categoryValue === "object"
  ) {
    const nested = categoryValue as Record<string, unknown>;

    values.push(
      nested.id,
      nested._id,
      nested.slug,
      nested.name,
      nested.nameBn
    );
  }

  return values.some((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    const text = normalize(value);

    return (
      identifiers.has(text) ||
      identifiers.has(makeSlug(text))
    );
  });
}

export default async function CategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const selectedCategory = categories.find((category) => {
    const identifiers = getCategoryIdentifiers(category);

    return (
      identifiers.includes(normalize(slug)) ||
      identifiers.includes(makeSlug(slug))
    );
  });

  if (!selectedCategory) {
    notFound();
  }

  const products = allProducts.filter((product) =>
    productMatchesCategory(product, selectedCategory)
  );

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/category"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          <span aria-hidden="true">←</span>
          সব ক্যাটাগরি
        </Link>

        <section className="mb-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-sm font-semibold text-green-700">
            বাংলা বাজার
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {selectedCategory.nameBn || selectedCategory.name}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            এই ক্যাটাগরির পণ্যের আজকের বাজার দর দেখুন এবং
            গতকালের দামের সঙ্গে তুলনা করুন।
          </p>

          <div className="mt-5 inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
            মোট পণ্য: {products.length}টি
          </div>
        </section>

        {products.length === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mb-4 text-4xl" aria-hidden="true">
              🧺
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              অন্য ক্যাটাগরি দেখুন অথবা পরে আবার চেষ্টা করুন।
            </p>

            <Link
              href="/category"
              className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              সব ক্যাটাগরি দেখুন
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={String(product.id)}
                product={product}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
