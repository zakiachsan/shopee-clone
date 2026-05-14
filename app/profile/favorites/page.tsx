"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const initialFavorites: FavoriteItem[] = [
  { id: 1, name: "Kaos Polos Katun Premium", price: 45000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
  { id: 2, name: "Hoodie Oversize Pria", price: 125000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop" },
  { id: 3, name: "Smart Watch Series 7", price: 149000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);

  const removeFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-8 min-h-screen">
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/profile" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-base font-medium text-shopee-text">Favorit Saya</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          <div className="hidden lg:flex items-center gap-2 mb-4">
            <Link href="/profile" className="p-1">
              <ChevronLeft className="w-5 h-5 text-shopee-text" />
            </Link>
            <h1 className="text-lg font-medium text-shopee-text">Favorit Saya</h1>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-white lg:rounded-sm p-10 text-center">
              <Heart className="w-12 h-12 text-shopee-border mx-auto mb-3" />
              <p className="text-sm text-shopee-text-secondary">Belum ada produk favorit.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {favorites.map((item) => (
                <div key={item.id} className="relative group">
                  <Link href={`/product/${item.id}`} className="block bg-white lg:rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-shopee-gray relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-sm text-shopee-text line-clamp-2">{item.name}</p>
                      <p className="text-sm text-shopee-orange font-medium mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                  </Link>
                  {/* Like button */}
                  <button
                    onClick={(e) => removeFavorite(e, item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
                    aria-label="Hapus dari favorit"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
