"use client";

import { useState } from "react";
import Link from "next/link";
import { navCategories, toSlug } from "@/lib/data";

export default function CategoryNav() {
  const [active, setActive] = useState("Elektronik");

  return (
    <nav className="hidden lg:block bg-white border-b border-shopee-border">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {navCategories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${toSlug(cat)}`}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-4 py-2.5 text-[13px] transition-colors relative ${
                active === cat
                  ? "text-shopee-orange font-medium"
                  : "text-shopee-text hover:text-shopee-orange"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-shopee-orange" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
