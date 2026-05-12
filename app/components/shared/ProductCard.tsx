"use client";

import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white border border-transparent hover:border-shopee-orange hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group rounded-sm overflow-hidden"
    >
      {/* Image */}
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
        {product.badge && (
          <div
            className={`absolute top-0 left-0 ${
              product.badgeColor || "bg-shopee-green"
            } text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-sm`}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 md:p-2.5">
        {/* Title */}
        <h3 className="text-xs md:text-sm text-shopee-text leading-[1.4] line-clamp-2 min-h-[2.8em]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-1.5">
          <p className="text-shopee-orange font-medium text-sm md:text-base leading-tight">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice > product.price && (
            <p className="text-[11px] text-shopee-text-secondary line-through leading-tight mt-0.5">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Rating & Sold */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-shopee-yellow fill-shopee-yellow" />
            <span className="text-[11px] text-shopee-text ml-0.5">{product.rating}</span>
          </div>
          <span className="text-shopee-border text-[10px]">|</span>
          <span className="text-[11px] text-shopee-text-secondary">Terjual {product.sold}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-0.5 mt-1 text-shopee-text-secondary">
          <MapPin className="w-3 h-3" />
          <span className="text-[11px]">{product.location}</span>
        </div>
      </div>
    </Link>
  );
}
