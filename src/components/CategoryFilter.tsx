"use client";

import { Category } from "@/types";
import Link from "next/link";

export default function CategoryFilter({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <Link
        href="/"
        className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
          !activeCategory
            ? "bg-green-600 text-white shadow-md"
            : "bg-white border hover:bg-green-50 text-gray-700"
        }`}
      >
        সকল পণ্য
      </Link>
      {categories.map((cat) => {
        const key = cat._id || cat.id || cat.slug;
        const isActive = activeCategory === cat.slug;
        return (
          <Link
            key={key}
            href={`/category/${cat.slug}`}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition flex items-center gap-1.5 ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border hover:bg-green-50 text-gray-700"
            }`}
          >
            {cat.icon && <span>{cat.icon}</span>}
            <span>{cat.nameBn || cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}