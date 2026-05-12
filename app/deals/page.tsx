"use client";

import Link from "next/link";
import { ChevronLeft, Tag, Star, MapPin } from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import { dealsProducts, formatPrice } from "@/lib/data";

export default function DealsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-base font-medium text-shopee-text">Deals</span>
        </div>

        {/* Desktop Page Title */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Tag className="w-6 h-6 text-shopee-orange" />
            <h1 className="text-xl font-medium text-shopee-text">Deals</h1>
          </div>
        </div>

        {/* Deals Hero Banner */}
        <div className="max-w-[1200px] mx-auto px-0 lg:px-4">
          <div className="bg-gradient-to-r from-shopee-orange via-[#FF6B4A] to-shopee-yellow px-4 py-6 lg:rounded-sm text-white">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-5 h-5" />
              <span className="font-bold text-lg uppercase tracking-wide">Murah Meriah</span>
            </div>
            <p className="text-white/90 text-sm">Serba di bawah Rp 10.000 — Diskon s/d 75%</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm">Gratis Ongkir</span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm">Cashback 10%</span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm">COD</span>
            </div>
          </div>
        </div>

        {/* Deals Count Bar */}
        <div className="max-w-[1200px] mx-auto px-3 lg:px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-shopee-text-secondary">
              Menampilkan <span className="text-shopee-orange font-medium">{dealsProducts.length}</span> produk murah
            </p>
            <span className="text-xs text-shopee-text-secondary">Harga max Rp 10.000</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="max-w-[1200px] mx-auto px-3 lg:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {dealsProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white rounded-sm border border-shopee-border/50 hover:shadow-md transition-all duration-200 cursor-pointer group block overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-shopee-gray">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-0 right-0 bg-shopee-orange text-white text-[10px] font-bold px-1.5 py-0.5">
                      <span className="block leading-tight">{product.discount}%</span>
                      <span className="block leading-tight">OFF</span>
                    </div>
                  )}
                  {/* Price Cap Badge */}
                  <div className="absolute bottom-0 left-0 bg-shopee-yellow text-white text-[9px] font-bold px-1.5 py-0.5">
                    &lt;10rb
                  </div>
                </div>
                <div className="p-2">
                  <h4 className="text-xs text-shopee-text line-clamp-2 min-h-[2.4em]">{product.name}</h4>
                  <div className="mt-1">
                    <p className="text-shopee-orange font-medium text-sm">{formatPrice(product.price)}</p>
                    <p className="text-[11px] text-shopee-text-secondary line-through">{formatPrice(product.originalPrice)}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3 h-3 text-shopee-yellow fill-shopee-yellow" />
                    <span className="text-[10px] text-shopee-text-secondary">{product.rating}</span>
                    <span className="text-[10px] text-shopee-border">|</span>
                    <span className="text-[10px] text-shopee-text-secondary">{product.sold} terjual</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-shopee-text-secondary" />
                    <span className="text-[10px] text-shopee-text-secondary">{product.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1200px] mx-auto px-3 lg:px-4 mt-6 mb-4">
          <div className="bg-white rounded-sm border border-shopee-border/50 p-4 text-center">
            <p className="text-sm text-shopee-text-secondary">Udah liat semua deals hari ini?</p>
            <Link
              href="/"
              className="inline-block mt-2 px-6 py-2 bg-shopee-orange text-white text-sm font-medium rounded-sm hover:bg-[#D7391D] transition-colors"
            >
              Lihat Produk Lainnya
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
