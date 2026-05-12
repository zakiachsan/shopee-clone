"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  MessageSquare,
  Store,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Clock,
  ChevronLeft,
} from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import Footer from "@/app/components/layout/Footer";
import { products, formatPrice } from "@/lib/data";

const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["Merah", "Hitam", "Biru", "Putih", "Abu-abu"];

export default function ProductClient({ id }: { id: number }) {
  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Hitam");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");

  const images = [product.image, product.image, product.image, product.image, product.image];

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-16 lg:pb-0">
        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-shopee-text-secondary mb-3 px-1">
            <Link href="/" className="hover:text-shopee-orange">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-shopee-orange cursor-pointer">Elektronik</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-shopee-text line-clamp-1 max-w-[300px]">{product.name}</span>
          </div>

          {/* Mobile back */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white sticky top-0 z-40 border-b border-shopee-border">
            <Link href="/" className="p-1">
              <ChevronLeft className="w-5 h-5 text-shopee-text" />
            </Link>
            <span className="text-sm text-shopee-text line-clamp-1">{product.name}</span>
          </div>

          <div className="bg-white rounded-sm">
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 p-0 lg:p-4">
              {/* Images */}
              <div className="lg:w-[450px] flex-shrink-0">
                <div className="aspect-square bg-shopee-gray relative">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x600/f5f5f5/757575?text=${encodeURIComponent(product.name.slice(0, 15))}`;
                    }}
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-shopee-orange text-white text-xs font-bold px-2 py-1 rounded-sm">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-3 overflow-x-auto px-3 lg:px-0 pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 flex-shrink-0 border-2 rounded-sm overflow-hidden ${
                        selectedImage === idx ? "border-shopee-orange" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="hidden lg:flex items-center justify-between mt-4 px-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-shopee-text-secondary">Bagikan:</span>
                    <button className="flex items-center gap-1 text-xs text-shopee-text hover:text-shopee-orange">
                      <Heart className="w-4 h-4" /> Favorit
                    </button>
                    <button className="flex items-center gap-1 text-xs text-shopee-text hover:text-shopee-orange">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 px-3 lg:px-0 py-3 lg:py-0">
                <div className="flex items-start gap-2">
                  {product.badge && (
                    <span className="bg-shopee-green text-white text-[10px] px-1.5 py-0.5 rounded-sm flex-shrink-0 mt-0.5">
                      {product.badge}
                    </span>
                  )}
                  <h1 className="text-base lg:text-xl text-shopee-text leading-snug">{product.name}</h1>
                </div>

                <div className="flex items-center gap-3 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-shopee-orange underline">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? "text-shopee-yellow fill-shopee-yellow"
                              : "text-shopee-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-shopee-border">|</span>
                  <span className="text-shopee-text-secondary">{product.sold} Terjual</span>
                </div>

                {/* Price */}
                <div className="mt-3 bg-shopee-gray/50 p-3 rounded-sm">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl lg:text-3xl text-shopee-orange font-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-shopee-text-secondary line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-shopee-orange text-white text-xs px-1.5 py-0.5 rounded-sm">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-shopee-orange-light text-shopee-orange text-[11px] px-2 py-0.5 rounded-sm">
                      Gratis Ongkir
                    </span>
                    <span className="bg-shopee-orange-light text-shopee-orange text-[11px] px-2 py-0.5 rounded-sm">
                      Cashback 10%
                    </span>
                  </div>
                </div>

                {/* Variants */}
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-sm text-shopee-text-secondary block mb-2">Varian: {selectedColor}</span>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 text-xs border rounded-sm transition-colors ${
                            selectedColor === c
                              ? "border-shopee-orange text-shopee-orange bg-shopee-orange-light"
                              : "border-shopee-border text-shopee-text hover:border-shopee-orange"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-shopee-text-secondary block mb-2">Ukuran: {selectedSize}</span>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`w-10 h-8 text-xs border rounded-sm transition-colors flex items-center justify-center ${
                            selectedSize === s
                              ? "border-shopee-orange text-shopee-orange bg-shopee-orange-light"
                              : "border-shopee-border text-shopee-text hover:border-shopee-orange"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-shopee-text-secondary block mb-2">Kuantitas</span>
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-8 h-8 border border-shopee-border flex items-center justify-center hover:bg-shopee-gray transition-colors rounded-l-sm"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 h-8 border-t border-b border-shopee-border flex items-center justify-center text-sm">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-8 h-8 border border-shopee-border flex items-center justify-center hover:bg-shopee-gray transition-colors rounded-r-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="ml-3 text-xs text-shopee-text-secondary">Tersedia 150 stok</span>
                    </div>
                  </div>
                </div>

                {/* Actions Desktop */}
                <div className="hidden lg:flex items-center gap-3 mt-6">
                  <button className="flex-1 h-12 border-2 border-shopee-orange text-shopee-orange bg-shopee-orange-light font-medium rounded-sm hover:bg-shopee-orange/10 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Masukkan Keranjang
                  </button>
                  <Link href="/checkout" className="flex-1 h-12 bg-shopee-orange hover:bg-[#D7391D] text-white font-medium rounded-sm transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Beli Sekarang
                  </Link>
                </div>

                {/* Guarantees */}
                <div className="hidden lg:grid grid-cols-3 gap-3 mt-6 p-3 border border-shopee-border rounded-sm">
                  <div className="flex items-center gap-2 text-xs text-shopee-text-secondary">
                    <ShieldCheck className="w-4 h-4 text-shopee-green" />
                    100% Ori
                  </div>
                  <div className="flex items-center gap-2 text-xs text-shopee-text-secondary">
                    <Truck className="w-4 h-4 text-shopee-green" />
                    Gratis Ongkir
                  </div>
                  <div className="flex items-center gap-2 text-xs text-shopee-text-secondary">
                    <Clock className="w-4 h-4 text-shopee-green" />
                    15 Hari Retur
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Info */}
            <div className="border-t border-shopee-border p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-shopee-gray border border-shopee-border overflow-hidden">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-shopee-text">Toko {product.location} Official</p>
                    <p className="text-xs text-shopee-text-secondary">Aktif 5 menit lalu</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-shopee-border text-xs text-shopee-text rounded-sm hover:bg-shopee-gray flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Chat
                  </button>
                  <button className="px-3 py-1.5 border border-shopee-orange text-xs text-shopee-orange rounded-sm hover:bg-shopee-orange-light flex items-center gap-1">
                    <Store className="w-3.5 h-3.5" /> Kunjungi Toko
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-shopee-border">
              <div className="flex items-center gap-0 sticky top-0 bg-white z-30 border-b border-shopee-border">
                {["deskripsi", "ulasan", "diskusi"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm capitalize transition-colors relative ${
                      activeTab === tab
                        ? "text-shopee-orange font-medium"
                        : "text-shopee-text-secondary hover:text-shopee-text"
                    }`}
                  >
                    {tab === "deskripsi" ? "Deskripsi Produk" : tab === "ulasan" ? "Ulasan (1.2rb)" : "Diskusi (45)"}
                    {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-shopee-orange" />}
                  </button>
                ))}
              </div>
              <div className="p-3 lg:p-6 min-h-[200px]">
                {activeTab === "deskripsi" && (
                  <div className="space-y-3 text-sm text-shopee-text">
                    <p>
                      {product.name} dengan kualitas premium terbaik. Produk original dan bergaransi resmi.
                    </p>
                    <p>
                      <strong>Spesifikasi:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-shopee-text-secondary">
                      <li>Material berkualitas tinggi</li>
                      <li>Design modern dan ergonomis</li>
                      <li>Tersedia dalam berbagai varian warna dan ukuran</li>
                      <li>Garansi resmi 1 tahun</li>
                      <li>Free packing bubble wrap + kardus</li>
                    </ul>
                  </div>
                )}
                {activeTab === "ulasan" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-3xl font-medium text-shopee-orange">{product.rating}</span>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-shopee-yellow fill-shopee-yellow"
                                  : "text-shopee-border"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-shopee-text-secondary mt-1">1.234 Ulasan</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-shopee-text w-3">{star}</span>
                            <Star className="w-3 h-3 text-shopee-yellow fill-shopee-yellow" />
                            <div className="flex-1 h-2 bg-shopee-gray rounded-full overflow-hidden">
                              <div
                                className="h-full bg-shopee-yellow rounded-full"
                                style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "diskusi" && (
                  <div className="text-sm text-shopee-text-secondary text-center py-8">
                    Belum ada diskusi untuk produk ini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-shopee-border z-[60] flex items-center h-14">
        <button className="flex-1 h-full bg-shopee-orange-light text-shopee-orange text-sm font-medium">
          Masukkan Keranjang
        </button>
        <Link href="/checkout" className="flex-1 h-full bg-shopee-orange text-white text-sm font-medium flex items-center justify-center">
          Beli Sekarang
        </Link>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
