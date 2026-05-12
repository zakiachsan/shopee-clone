"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { products, formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";

function BestSellerCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex-shrink-0 w-[160px] md:w-[200px] bg-white rounded-sm border border-shopee-border/50 hover:shadow-md transition-all cursor-pointer group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-shopee-gray">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x300/f5f5f5/757575?text=${encodeURIComponent(product.name.slice(0, 12))}`;
          }}
        />
        <div className="absolute top-2 left-2 bg-shopee-orange text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
          {index + 1}
        </div>
      </div>
      <div className="p-2">
        <h4 className="text-xs text-shopee-text line-clamp-2 min-h-[2.4em]">{product.name}</h4>
        <p className="text-shopee-orange font-medium text-sm mt-1">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] bg-shopee-orange-light text-shopee-orange px-1 py-0.5 rounded-sm">
            Terjual {product.sold}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Deterministic shuffle using product id as seed
function seededShuffle(arr: Product[]) {
  const result = [...arr];
  return result.sort((a, b) => {
    const hashA = (a.id * 2654435761) % 2147483647;
    const hashB = (b.id * 2654435761) % 2147483647;
    return hashA - hashB;
  });
}

export default function BestSellers() {
  const bestSellers = useMemo(() => seededShuffle(products).slice(0, 8), []);

  return (
    <div className="max-w-[1200px] mx-auto px-2 md:px-4 mt-3 md:mt-4">
      <div className="bg-white rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 border-b border-shopee-border/50">
          <TrendingUp className="w-5 h-5 text-shopee-orange" />
          <span className="text-shopee-orange font-bold text-base md:text-xl">Produk Terlaris</span>
        </div>

        {/* Horizontal Scroll */}
        <div className="p-2 md:p-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-3 w-max px-0.5 pb-1">
            {bestSellers.map((product, idx) => (
              <BestSellerCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
