import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const currentPrice = product.today ?? product.price ?? 0;
  const previousPrice = product.yesterday ?? product.previousPrice ?? 0;
  const isPriceUp = currentPrice > previousPrice;
  const isPriceDown = currentPrice < previousPrice;
  const productId = product.id ?? product._id ?? "";
  const name = product.nameBn || product.name || "পণ্য";

  return (
    <div className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
      <div className="flex gap-4 items-center">
        {product.image && (product.image.startsWith("http") || product.image.startsWith("/")) ? (
          <Image
            src={product.image}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-slate-100 text-3xl rounded-lg border">
            {product.image || product.categoryIcon || "📦"}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">১ {product.unit || "কেজি"}</p>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold text-xl text-gray-900">৳ {currentPrice}</div>
        {(isPriceUp || isPriceDown) && previousPrice > 0 && (
          <div
            className={`text-sm flex items-center justify-end gap-1 font-medium ${
              isPriceUp ? "text-red-500" : "text-green-600"
            }`}
          >
            {isPriceUp ? "↑" : "↓"} ৳ {Math.abs(currentPrice - previousPrice)}
          </div>
        )}
        <Link
          href={`/product/${productId}`}
          className="inline-block mt-2 text-sm bg-green-100 text-green-800 font-medium px-3 py-1 rounded-lg hover:bg-green-200 transition"
        >
          বিস্তারিত
        </Link>
      </div>
    </div>
  );
}