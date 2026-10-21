import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const isPriceUp = product.price > product.previousPrice;
  const isPriceDown = product.price < product.previousPrice;

  return (
    <div className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
      <div className="flex gap-4 items-center">
        <Image  src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">1 {product.unit}</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-xl">৳ {product.price}</div>
        {(isPriceUp || isPriceDown) && (
          <div className={`text-sm flex items-center justify-end gap-1 font-medium ${isPriceUp ? 'text-red-500' : 'text-green-500'}`}>
            {isPriceUp ? '↑' : '↓'} ৳ {Math.abs(product.price - product.previousPrice)}
          </div>
        )}
        <Link href={`/product/${product._id}`} className="inline-block mt-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
          Details
        </Link>
      </div>
    </div>
  );
}