
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default async function CategorySlugPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find((item) => {
    const raw = item as Category & {
      slug?: string;
    };

    return [
      raw.slug,
      String(raw.id),
      String(raw.name),
      String(raw.nameBn),
    ].some(
      (value) =>
        value &&
        (value.toLowerCase() === slug.toLowerCase() ||
          makeSlug(value) === slug.toLowerCase())
    );
  });

  if (!category) {
    notFound();
  }

  const selectedCategory = category as Category & {
    slug?: string;
  };

  const products = allProducts.filter((item) => {
    const product = item as Product & {
      category?: string | number | {
        id?: string | number;
        _id?: string;
        slug?: string;
        name?: string;
        nameBn?: string;
      };
      categoryId?: string | number;
      categorySlug?: string;
      categoryName?: string;
    };

    const value = product.category;

    const categoryValues =
      value && typeof value === "object"
        ? [
            value.id,
            value._id,
            value.slug,
            value.name,
            value.nameBn,
          ]
        : [value];

    categoryValues.push(
      product.categoryId,
      product.categorySlug,
      product.categoryName
    );

    const identifiers = [
      selectedCategory.id,
      selectedCategory.slug,
      selectedCategory.name,
      selectedCategory.nameBn,
    ]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    return categoryValues.some((value) => {
      if (value === undefined || value === null) {
        return false;
      }

      const text = String(value).toLowerCase();

      return identifiers.includes(text) ||
        identifiers.includes(makeSlug(text));
    });
  });

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/category"
          className="mb-6 inline-block text-green-700 hover:underline"
        >
          ← সব ক্যাটাগরি
        </Link>

        <h1 className="mb-3 text-3xl font-bold text-green-700">
          {category.nameBn || category.name}
        </h1>

        <p className="mb-8 text-gray-600">
          এই ক্যাটাগরির সকল পণ্যের বাজার দর দেখুন।
        </p>

        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-700">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
            <p className="mt-2 text-sm text-gray-500">
              API-তে পণ্যের ক্যাটাগরি ফিল্ড পরীক্ষা করুন।
            </p>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-gray-600">
              মোট পণ্য: {products.length}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
