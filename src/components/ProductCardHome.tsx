import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardHomeProps {
  product: Product;
}

export default function ProductCardHome({ product }: ProductCardHomeProps) {
  const currentPrice = product.today ?? product.price ?? 0;
  const previousPrice = product.yesterday ?? product.previousPrice ?? 0;
  const change = currentPrice - previousPrice;
  const pct = previousPrice > 0 ? ((change / previousPrice) * 100).toFixed(1) : null;
  const isUp = change > 0;
  const isDown = change < 0;
  const name = product.nameBn || product.name || "পণ্য";
  const productId = product.id ?? product._id ?? "";

  const hasImgUrl =
    product.image &&
    (product.image.startsWith("http") || product.image.startsWith("/"));

  return (
    <Link href={`/product/${productId}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {hasImgUrl ? (
            <Image
              src={product.image}
              alt={name}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-2xl rounded-lg border border-green-100">
              {product.image || product.categoryIcon || "📦"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">
              {name}
            </h3>
            <p className="text-xs text-gray-400">১ {product.unit || "কেজি"}</p>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-2">
          <p className="text-xs text-gray-400 mb-0.5">আজকের দাম</p>
          <div className="flex items-end justify-between">
            <span className="text-lg font-bold text-gray-900">৳{currentPrice}</span>
            {pct && previousPrice > 0 && (
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                  isUp
                    ? "text-red-600 bg-red-50"
                    : isDown
                    ? "text-green-600 bg-green-50"
                    : "text-gray-400 bg-gray-50"
                }`}
              >
                {isUp ? "↑" : "↓"} {Math.abs(Number(pct))}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
