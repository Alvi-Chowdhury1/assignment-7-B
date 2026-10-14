import { getProducts, getCategories } from "@/lib/api";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCardHome from "@/components/ProductCardHome";
import Marquee from "@/components/Marquee";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  const priceUp = products.filter((p) => p.today > p.yesterday && p.yesterday > 0);
  const priceDown = products.filter((p) => p.today < p.yesterday && p.yesterday > 0);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-0">
      <Marquee />
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-white border-b border-green-100 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex-1">
            <p className="text-sm text-green-700 font-medium mb-2">{today}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
              আজকের বাজারের দাম<br />এক নজরে
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
              চাল, ডাল, তেল, মাছি, মাংস, সবজি, ডিম ও মশলা — বাংলাদেশের প্রতিটি
              জেলার আজকের হালনাগাদ বাজার দর এক জায়গায়।
            </p>
            <Link
              href="#all-products"
              className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              বাজার দেখুন
            </Link>
          </div>
          <div className="hidden md:flex text-9xl select-none flex-shrink-0">
            🧺
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
       
        <CategoryFilter categories={categories} />

       
        {priceUp.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 text-lg">📈</span>
              <h2 className="text-lg font-bold text-gray-800">আজকের দাম বেড়েছে</h2>
              <span className="ml-auto text-xs text-gray-400 bg-red-50 text-red-400 px-2 py-0.5 rounded-full font-medium">
                {priceUp.length}টি পণ্য
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceUp.slice(0, 6).map((product) => (
                <ProductCardHome
                  key={product._id || product.id || product.slug}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        {/* Price Down Section */}
        {priceDown.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 text-lg">📉</span>
              <h2 className="text-lg font-bold text-gray-800">আজকের দাম কমেছে</h2>
              <span className="ml-auto text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                {priceDown.length}টি পণ্য
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceDown.slice(0, 6).map((product) => (
                <ProductCardHome
                  key={product._id || product.id || product.slug}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section id="all-products">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-800">সব পণ্য</h2>
            <span className="text-xs text-gray-400">
              — সকল ক্যাটাগরির আজকের বাজার দর
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            মোট {products.length}টি পণ্যের তথ্য পাওয়া গেছে
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCardHome
                key={product._id || product.id || product.slug}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}