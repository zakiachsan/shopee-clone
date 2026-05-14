"use client";

import Link from "next/link";
import {
  ChevronLeft,
  User,
  MapPin,
  ClipboardList,
  Heart,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  Star,
  ShoppingBag,
  Truck,
  PackageCheck,
  LogOut,
} from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import { useAuth } from "@/app/components/layout/AuthProvider";

const menuGroups = [
  {
    title: "Pesanan Saya",
    items: [
      { icon: ClipboardList, label: "Semua Pesanan", href: "/profile/orders" },
      { icon: ShoppingBag, label: "Menunggu Pembayaran", href: "/profile/orders?status=unpaid" },
      { icon: PackageCheck, label: "Dikemas", href: "/profile/orders?status=packed" },
      { icon: Truck, label: "Dikirim", href: "/profile/orders?status=shipped" },
      { icon: Star, label: "Selesai", href: "/profile/orders?status=completed" },
    ],
  },
  {
    title: "Layanan Saya",
    items: [
      { icon: Heart, label: "Favorit Saya", href: "/profile/favorites" },
      { icon: Bell, label: "Notifikasi", href: "/profile/notifications" },
      { icon: MapPin, label: "Alamat Pengiriman", href: "/profile/address" },
      { icon: Settings, label: "Pengaturan", href: "/profile/settings" },
      { icon: HelpCircle, label: "Pusat Bantuan", href: "/profile/help" },
    ],
  },
];

export default function ProfilePage() {
  const { user, logout, loginOpen, openLogin, closeLogin } = useAuth();

  return (
    <>
      <Header />

      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-base font-medium text-shopee-text">Profil Saya</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          {/* Profile Card */}
          <div className="bg-shopee-orange px-4 py-5 lg:rounded-sm">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-base">{user?.name || "Pengguna Baru"}</p>
                <p className="text-white/80 text-xs">{user ? `+62 ${user.phone}` : "+62 812-3456-7890"}</p>
              </div>
              <Link
                href="#"
                className="text-white text-xs border border-white/40 px-3 py-1 rounded-sm hover:bg-white/10 transition-colors"
              >
                Edit
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-0 mt-4 pt-4 border-t border-white/20">
              {[
                { label: "Voucher", value: "3" },
                { label: "Koin", value: "1.250" },
                { label: "Following", value: "12" },
                { label: "Followers", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-white font-medium text-sm">{stat.value}</p>
                  <p className="text-white/70 text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Groups */}
          <div className="mt-3 space-y-3">
            {menuGroups.map((group) => (
              <div key={group.title} className="bg-white lg:rounded-sm">
                <p className="px-4 py-2.5 text-xs font-medium text-shopee-text-secondary border-b border-shopee-border/50">
                  {group.title}
                </p>
                <div className="grid grid-cols-5 gap-0">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex flex-col items-center gap-1 py-3 hover:bg-shopee-gray transition-colors"
                      >
                        <Icon className="w-5 h-5 text-shopee-text-secondary" strokeWidth={1.5} />
                        <span className="text-[10px] text-shopee-text text-center leading-tight px-1">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Other Links */}
          <div className="mt-3 bg-white lg:rounded-sm">
            {[
              { label: "Kebijakan Privasi", href: "#" },
              { label: "Syarat & Ketentuan", href: "#" },
              { label: "Hubungi Kami", href: "#" },
            ].map((link, i, arr) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 hover:bg-shopee-gray transition-colors ${
                  i < arr.length - 1 ? "border-b border-shopee-border/50" : ""
                }`}
              >
                <span className="text-sm text-shopee-text">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-shopee-text-secondary" />
              </Link>
            ))}
          </div>

          {/* Logout CTA */}
          <div className="mt-3 bg-white lg:rounded-sm p-4">
            {user ? (
              <button
                onClick={logout}
                className="w-full py-3 bg-red-50 text-red-500 text-sm font-medium rounded-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluar Akun
              </button>
            ) : (
              <button
                onClick={openLogin}
                className="w-full py-3 bg-shopee-orange text-white text-sm font-medium rounded-sm hover:bg-[#1A7BD4] transition-colors flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
