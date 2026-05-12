"use client";

import Link from "next/link";
import { categories, toSlug } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="bg-white rounded-sm">
        {/* Desktop: 2 rows x 10 columns */}
        <div className="hidden md:grid grid-cols-10 gap-0 py-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${toSlug(cat.name)}`}
              className="flex flex-col items-center gap-2 p-2 cursor-pointer hover:bg-shopee-orange-light/50 transition-colors rounded-sm group"
            >
              <div
                className={`w-11 h-11 md:w-12 md:h-12 rounded-[14px] flex items-center justify-center text-xl md:text-2xl ${cat.color} group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <span className="text-[11px] md:text-xs text-center text-shopee-text leading-tight line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile: horizontal scroll 2 rows */}
        <div className="md:hidden py-4">
          <div className="grid grid-cols-5 gap-y-4 px-2">
            {categories.slice(0, 10).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${toSlug(cat.name)}`}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${cat.color}`}
                >
                  {cat.icon}
                </div>
                <span className="text-[10px] text-center text-shopee-text leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-3 gap-1">
            <span className="w-5 h-1.5 rounded-full bg-shopee-orange" />
            <span className="w-1.5 h-1.5 rounded-full bg-shopee-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
