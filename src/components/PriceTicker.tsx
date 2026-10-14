"use client";

import { Product } from "@/types";

export default function PriceTicker({ products }: { products: Product[] }) {
  const tickerProducts = products.slice(0, 20);

  return (
    <div className="bg-green-700 text-white overflow-hidden py-2 text-xs font-medium">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tickerProducts, ...tickerProducts].map((p, i) => {
          const change = p.today - p.yesterday;
          const pct = p.yesterday > 0 ? ((change / p.yesterday) * 100).toFixed(1) : "0.0";
          const isUp = change > 0;
          const isDown = change < 0;
          return (
            <span key={i} className="mx-4 flex items-center gap-1">
              <span>{p.image && !p.image.startsWith("http") ? p.image : "📦"}</span>
              <span>{p.nameBn}</span>
              <span className="font-bold">৳{p.today}</span>
              {isUp && (
                <span className="text-red-300 flex items-center gap-0.5">
                  ↑ {Math.abs(Number(pct))}%
                </span>
              )}
              {isDown && (
                <span className="text-green-300 flex items-center gap-0.5">
                  ↓ {Math.abs(Number(pct))}%
                </span>
              )}
              {!isUp && !isDown && <span className="text-gray-300">—</span>}
              <span className="mx-2 text-green-400">|</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
