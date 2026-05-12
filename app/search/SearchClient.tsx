"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import Footer from "@/app/components/layout/Footer";
import ProductCard from "@/app/components/shared/ProductCard";
import { products } from "@/lib/data";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  let filtered = [...products];
  if (category) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(category.toLowerCase())
    );
  }
  if (query) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const title = query || category || "Pencarian";

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-sm text-shopee-text line-clamp-1">{title}</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-shopee-text-secondary mb-4">
            <Link href="/" className="hover:text-shopee-orange">Beranda</Link>
            <span>/</span>
            <span className="text-shopee-text">Hasil Pencarian: {title}</span>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-sm p-3 mb-4 flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <span className="text-sm text-shopee-text font-medium whitespace-nowrap">Urutkan:</span>
            <button className="px-3 py-1.5 text-xs bg-shopee-orange text-white rounded-sm whitespace-nowrap">Relevansi</button>
            <button className="px-3 py-1.5 text-xs text-shopee-text border border-shopee-border rounded-sm hover:border-shopee-orange hover:text-shopee-orange whitespace-nowrap">Terbaru</button>
            <button className="px-3 py-1.5 text-xs text-shopee-text border border-shopee-border rounded-sm hover:border-shopee-orange hover:text-shopee-orange whitespace-nowrap">Terlaris</button>
            <button className="px-3 py-1.5 text-xs text-shopee-text border border-shopee-border rounded-sm hover:border-shopee-orange hover:text-shopee-orange whitespace-nowrap">Harga</button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-shopee-text border border-shopee-border rounded-sm hover:border-shopee-orange hover:text-shopee-orange whitespace-nowrap">
              <SlidersHorizontal className="w-3 h-3" /> Filter
            </button>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-shopee-text-secondary mb-3">
                Menampilkan {filtered.length} produk untuk &quot;{title}&quot;
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-2.5">
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-sm py-16 text-center">
              <p className="text-shopee-text-secondary text-sm">Tidak ada produk yang cocok dengan &quot;{title}&quot;</p>
              <Link href="/" className="inline-block mt-3 px-6 py-2 bg-shopee-orange text-white text-sm rounded-sm hover:bg-[#D7391D]">
                Kembali ke Beranda
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
