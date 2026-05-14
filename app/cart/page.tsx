"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2, Truck, Tag, ChevronRight } from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import Footer from "@/app/components/layout/Footer";
import { products, formatPrice } from "@/lib/data";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  variant: string;
  qty: number;
  shop: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    productId: 101,
    name: "Kaos Polos Katun Premium Lengan Pendek",
    price: 45000,
    originalPrice: 89000,
    image: products[0].image,
    variant: "Hitam, M",
    qty: 2,
    shop: "Bandung Fashion Store",
  },
  {
    id: 2,
    productId: 102,
    name: "Hoodie Oversize Pria Wanita Unisex",
    price: 125000,
    originalPrice: 250000,
    image: products[1].image,
    variant: "Abu-abu, L",
    qty: 1,
    shop: "Jakarta Streetwear",
  },
  {
    id: 3,
    productId: 104,
    name: "Tas Ransel Laptop Anti Maling Waterproof",
    price: 159000,
    originalPrice: 320000,
    image: products[3].image,
    variant: "Hitam",
    qty: 1,
    shop: "Bandung Fashion Store",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected(cart.map((c) => c.id));
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const selectedItems = cart.filter((item) => selected.includes(item.id));
  const totalItems = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalOriginal = selectedItems.reduce((sum, item) => sum + item.originalPrice * item.qty, 0);

  const grouped = cart.reduce((acc, item) => {
    if (!acc[item.shop]) acc[item.shop] = [];
    acc[item.shop].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-32 lg:pb-8">
        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
            <Link href="/" className="p-1">
              <ChevronLeft className="w-5 h-5 text-shopee-text" />
            </Link>
            <span className="text-base font-medium text-shopee-text">Keranjang Belanja</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart Items */}
            <div className="flex-1">
              {/* Select All Bar */}
              <div className="bg-white px-3 lg:px-4 py-3 flex items-center gap-3 sticky top-0 lg:top-[120px] z-30 border-b border-shopee-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.length === cart.length && cart.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-shopee-orange rounded border-shopee-border"
                  />
                  <span className="text-sm text-shopee-text">
                    Pilih Semua ({cart.length} Produk)
                  </span>
                </label>
              </div>

              {Object.entries(grouped).map(([shop, items]) => (
                <div key={shop} className="bg-white mt-2 lg:mt-3 border-b border-shopee-border lg:border-0 lg:rounded-sm overflow-hidden">
                  {/* Shop Header */}
                  <div className="px-3 lg:px-4 py-2.5 flex items-center gap-2 border-b border-shopee-border/50">
                    <span className="text-xs font-medium text-shopee-text">{shop}</span>
                    <span className="text-[10px] bg-shopee-orange-light text-shopee-orange px-1.5 py-0.5 rounded-sm">
                      Official
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-shopee-border/50">
                    {items.map((item) => (
                      <div key={item.id} className="px-3 lg:px-4 py-3 flex gap-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="w-4 h-4 accent-shopee-orange mt-6 lg:mt-8 flex-shrink-0"
                        />
                        <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-shopee-gray rounded-sm overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-shopee-text line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-shopee-text-secondary mt-0.5">{item.variant}</p>
                          <div className="flex items-end justify-between mt-2">
                            <div>
                              <p className="text-shopee-orange font-medium text-sm">
                                {formatPrice(item.price)}
                              </p>
                              <p className="text-[11px] text-shopee-text-secondary line-through">
                                {formatPrice(item.originalPrice)}
                              </p>
                            </div>
                            <div className="flex items-center gap-0">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="w-7 h-7 border border-shopee-border flex items-center justify-center rounded-l-sm"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 h-7 border-t border-b border-shopee-border flex items-center justify-center text-xs">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="w-7 h-7 border border-shopee-border flex items-center justify-center rounded-r-sm"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] bg-shopee-orange-light text-shopee-orange px-1.5 py-0.5 rounded-sm">
                              <Truck className="w-3 h-3 inline mr-0.5" />
                              Gratis Ongkir
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-shopee-text-secondary hover:text-shopee-orange transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="bg-white py-16 text-center">
                  <p className="text-shopee-text-secondary text-sm">Keranjang belanjamu masih kosong</p>
                  <Link href="/" className="inline-block mt-3 px-6 py-2 bg-shopee-orange text-white text-sm rounded-sm hover:bg-[#1A7BD4]">
                    Mulai Belanja
                  </Link>
                </div>
              )}
            </div>

            {/* Summary Desktop */}
            <div className="hidden lg:block w-[320px]">
              <div className="bg-white rounded-sm p-4 sticky top-[120px]">
                <h3 className="text-sm font-medium text-shopee-text mb-3">Ringkasan Belanja</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-shopee-text-secondary">
                    <span>Total Harga ({totalItems} barang)</span>
                    <span>{formatPrice(totalOriginal)}</span>
                  </div>
                  <div className="flex justify-between text-shopee-text-secondary">
                    <span>Total Diskon</span>
                    <span className="text-shopee-orange">-{formatPrice(totalOriginal - totalPrice)}</span>
                  </div>
                  <div className="border-t border-shopee-border pt-2 flex justify-between items-center">
                    <span className="text-shopee-text font-medium">Total Harga</span>
                    <span className="text-xl text-shopee-orange font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className={`mt-4 w-full h-11 rounded-sm font-medium flex items-center justify-center transition-colors ${
                    selected.length > 0
                      ? "bg-shopee-orange hover:bg-[#1A7BD4] text-white"
                      : "bg-shopee-border text-shopee-text-secondary cursor-not-allowed"
                  }`}
                >
                  Checkout ({totalItems})
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Summary */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-shopee-border z-[60] px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-xs text-shopee-text-secondary">Total ({totalItems} Produk)</p>
            <p className="text-lg text-shopee-orange font-medium">{formatPrice(totalPrice)}</p>
          </div>
          <Link
            href="/checkout"
            className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-colors ${
              selected.length > 0 ? "bg-shopee-orange text-white" : "bg-shopee-border text-shopee-text-secondary"
            }`}
          >
            Checkout
          </Link>
        </div>
      )}

      <div className="hidden lg:block">
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
