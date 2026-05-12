"use client";

import Link from "next/link";
import { Tag, ChevronRight } from "lucide-react";
import { products, formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";

function DiscountCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex-shrink-0 w-[140px] md:w-[190px] bg-white rounded-sm border border-shopee-border/50 hover:shadow-md transition-all cursor-pointer group block"
    >
      <div className="relative aspect-square overflow-hidden bg-shopee-gray">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x400/f5f5f5/757575?text=${encodeURIComponent(product.name.slice(0, 12))}`;
          }}
        />
        {product.discount && (
          <div className="absolute top-0 right-0 bg-shopee-orange text-white text-[10px] font-bold px-1.5 py-0.5">
            <span className="block leading-tight">{product.discount}%</span>
            <span className="block leading-tight">OFF</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <h4 className="text-xs text-shopee-text line-clamp-2 min-h-[2.4em]">{product.name}</h4>
        <div className="mt-1">
          <p className="text-shopee-orange font-medium text-sm">{formatPrice(product.price)}</p>
          <p className="text-[11px] text-shopee-text-secondary line-through">{formatPrice(product.originalPrice)}</p>
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 bg-shopee-orange-light text-shopee-orange text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
          <Tag className="w-3 h-3" />
          Diskon {product.discount}%
        </div>
      </div>
    </Link>
  );
}

export default function DiscountSection() {
  const discountProducts = products
    .filter((p) => (p.discount || 0) >= 50)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 8);

  return (
    <div className="max-w-[1200px] mx-auto px-2 md:px-4 mt-3 md:mt-4">
      <div className="bg-white rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border-b border-shopee-border/50">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-shopee-orange" />
            <span className="text-shopee-orange font-bold text-base md:text-xl">Dengan Diskon</span>
            <span className="text-xs text-shopee-text-secondary hidden md:inline">Produk dengan diskon 50% ke atas</span>
          </div>
          <Link href="/discount" className="flex items-center gap-0.5 text-shopee-orange text-xs md:text-sm hover:underline">
            Lihat Semua
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scroll */}
        <div className="p-2 md:p-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-3 w-max px-0.5 pb-1">
            {discountProducts.map((product) => (
              <DiscountCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
