"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Truck,
  Tag,
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import Footer from "@/app/components/layout/Footer";
import { formatPrice } from "@/lib/data";

const cartItems = [
  {
    id: 1,
    name: "Kaos Polos Katun Premium Lengan Pendek",
    price: 45000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    variant: "Hitam, M",
    qty: 2,
    shop: "Bandung Fashion Store",
  },
  {
    id: 2,
    name: "Hoodie Oversize Pria Wanita Unisex",
    price: 125000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop",
    variant: "Abu-abu, L",
    qty: 1,
    shop: "Jakarta Streetwear",
  },
];

const shippingOptions = [
  { id: "jne", name: "JNE Reguler", price: 15000, eta: "2-3 hari" },
  { id: "jnt", name: "J&T Express", price: 12000, eta: "3-4 hari" },
  { id: "sicepat", name: "SiCepat", price: 10000, eta: "2-3 hari" },
];

const paymentMethods = [
  { id: "midtrans", name: "Midtrans", icon: CreditCard, desc: "Kartu Kredit / Debit, Virtual Account" },
  { id: "ovo", name: "OVO", icon: Wallet, desc: "Bayar dengan OVO" },
  { id: "dana", name: "DANA", icon: Smartphone, desc: "Bayar dengan DANA" },
  { id: "cod", name: "COD (Bayar di Tempat)", icon: Banknote, desc: "Bayar saat barang sampai" },
];

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState("jne");
  const [selectedPayment, setSelectedPayment] = useState("midtrans");
  const [voucher, setVoucher] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = shippingOptions.find((s) => s.id === selectedShipping)?.price || 15000;
  const discount = voucher === "DISKON10" ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-36 lg:pb-8">
        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
            <Link href="/cart" className="p-1">
              <ChevronLeft className="w-5 h-5 text-shopee-text" />
            </Link>
            <span className="text-base font-medium text-shopee-text">Checkout</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 space-y-3">
              {/* Address */}
              <div className="bg-white px-3 lg:px-4 py-3 lg:rounded-sm">
                <div className="flex items-center gap-2 text-shopee-orange mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Alamat Pengiriman</span>
                </div>
                <div className="pl-6">
                  <p className="text-sm font-medium text-shopee-text">John Doe (0812-3456-7890)</p>
                  <p className="text-sm text-shopee-text-secondary mt-0.5">
                    Jl. Mawar Indah No. 123, Blok C5, Kelurahan Ciputat, Kecamatan Ciputat, Tangerang Selatan, Banten 15411
                  </p>
                  <button className="mt-2 text-xs text-shopee-orange border border-shopee-orange px-3 py-1 rounded-sm hover:bg-shopee-orange-light">
                    Ubah Alamat
                  </button>
                </div>
              </div>

              {/* Products */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white px-3 lg:px-4 py-3 lg:rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-shopee-text">{item.shop}</span>
                    <span className="text-[10px] bg-shopee-orange-light text-shopee-orange px-1.5 py-0.5 rounded-sm">
                      Official
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 bg-shopee-gray rounded-sm overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-shopee-text line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-shopee-text-secondary">{item.variant}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-shopee-orange font-medium">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-xs text-shopee-text-secondary">x{item.qty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Shipping */}
              <div className="bg-white px-3 lg:px-4 py-3 lg:rounded-sm">
                <div className="flex items-center gap-2 text-shopee-text mb-3">
                  <Truck className="w-4 h-4 text-shopee-orange" />
                  <span className="text-sm font-medium">Pilihan Pengiriman</span>
                </div>
                <div className="space-y-2">
                  {shippingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer transition-colors ${
                        selectedShipping === opt.id
                          ? "border-shopee-orange bg-shopee-orange-light/50"
                          : "border-shopee-border hover:border-shopee-orange/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={selectedShipping === opt.id}
                          onChange={() => setSelectedShipping(opt.id)}
                          className="w-4 h-4 accent-shopee-orange"
                        />
                        <div>
                          <p className="text-sm text-shopee-text">{opt.name}</p>
                          <p className="text-xs text-shopee-text-secondary">Estimasi {opt.eta}</p>
                        </div>
                      </div>
                      <span className="text-sm text-shopee-text font-medium">{formatPrice(opt.price)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Voucher */}
              <div className="bg-white px-3 lg:px-4 py-3 lg:rounded-sm">
                <div className="flex items-center gap-2 text-shopee-text mb-3">
                  <Tag className="w-4 h-4 text-shopee-orange" />
                  <span className="text-sm font-medium">Voucher</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Masukkan kode voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    className="flex-1 border border-shopee-border rounded-sm px-3 py-2 text-sm outline-none focus:border-shopee-orange"
                  />
                  <button className="px-4 py-2 bg-shopee-orange text-white text-sm rounded-sm hover:bg-[#D7391D] transition-colors">
                    Pakai
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-shopee-green mt-2">Voucher berhasil! Diskon {formatPrice(discount)}</p>
                )}
              </div>

              {/* Payment */}
              <div className="bg-white px-3 lg:px-4 py-3 lg:rounded-sm">
                <div className="flex items-center gap-2 text-shopee-text mb-3">
                  <CreditCard className="w-4 h-4 text-shopee-orange" />
                  <span className="text-sm font-medium">Metode Pembayaran</span>
                </div>
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-shopee-orange bg-shopee-orange-light/50"
                            : "border-shopee-border hover:border-shopee-orange/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="w-4 h-4 accent-shopee-orange flex-shrink-0"
                        />
                        <div className="w-8 h-8 bg-shopee-gray rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-shopee-text" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-shopee-text">{method.name}</p>
                          <p className="text-xs text-shopee-text-secondary">{method.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Summary */}
            <div className="hidden lg:block w-[360px]">
              <div className="bg-white rounded-sm p-4 sticky top-[120px] space-y-4">
                <h3 className="text-sm font-medium text-shopee-text">Ringkasan Pesanan</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-shopee-text-secondary">
                    <span>Subtotal Produk</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-shopee-text-secondary">
                    <span>Ongkir</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-shopee-green">
                      <span>Diskon Voucher</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-shopee-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-shopee-text">Total Pembayaran</span>
                    <span className="text-xl text-shopee-orange font-medium">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-shopee-text-secondary">
                  <ShieldCheck className="w-4 h-4 text-shopee-green flex-shrink-0 mt-0.5" />
                  <span>
                    Dengan melanjutkan, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
                  </span>
                </div>

                <button className="w-full h-11 bg-shopee-orange hover:bg-[#D7391D] text-white font-medium rounded-sm transition-colors">
                  Buat Pesanan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Summary */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-shopee-border z-[60] px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-shopee-text-secondary">Total Pembayaran</span>
          <span className="text-lg text-shopee-orange font-medium">{formatPrice(total)}</span>
        </div>
        <button className="w-full h-10 bg-shopee-orange hover:bg-[#D7391D] text-white text-sm font-medium rounded-sm transition-colors">
          Buat Pesanan
        </button>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
