"use client";

import { products } from "@/lib/data";
import ProductCard from "@/app/components/shared/ProductCard";

export default function ProductGrid() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-shopee-orange font-medium text-base md:text-lg uppercase tracking-wide">
          Rekomendasi Untukmu
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-2.5">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6 mb-4">
        <button className="px-12 py-2.5 bg-white border border-shopee-border text-shopee-text-secondary text-sm hover:bg-shopee-gray transition-colors rounded-sm">
          Lihat Lainnya
        </button>
      </div>
    </div>
  );
}
