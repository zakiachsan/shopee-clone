"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ClipboardList, ShoppingBag, PackageCheck, Truck, Star } from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";

const tabs = [
  { key: "all", label: "Semua", icon: ClipboardList },
  { key: "unpaid", label: "Menunggu", icon: ShoppingBag },
  { key: "packed", label: "Dikemas", icon: PackageCheck },
  { key: "shipped", label: "Dikirim", icon: Truck },
  { key: "completed", label: "Selesai", icon: Star },
];

const dummyOrders = [
  { id: "ORD-001", status: "completed", items: "Kaos Polos Katun Premium", total: 90000, date: "10 Mei 2025" },
  { id: "ORD-002", status: "shipped", items: "Hoodie Oversize Pria", total: 125000, date: "12 Mei 2025" },
  { id: "ORD-003", status: "packed", items: "Smart Watch Series 7", total: 149000, date: "13 Mei 2025" },
  { id: "ORD-004", status: "unpaid", items: "TWS Headphone", total: 129000, date: "14 Mei 2025" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? dummyOrders : dummyOrders.filter((o) => o.status === activeTab);

  const statusLabel: Record<string, string> = {
    unpaid: "Menunggu Pembayaran",
    packed: "Sedang Dikemas",
    shipped: "Dalam Pengiriman",
    completed: "Pesanan Selesai",
  };

  const statusColor: Record<string, string> = {
    unpaid: "text-orange-500 bg-orange-50",
    packed: "text-blue-500 bg-blue-50",
    shipped: "text-shopee-orange bg-shopee-orange-light",
    completed: "text-green-600 bg-green-50",
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-8 min-h-screen">
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/profile" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-base font-medium text-shopee-text">Pesanan Saya</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          <div className="hidden lg:flex items-center gap-2 mb-4">
            <Link href="/profile" className="p-1">
              <ChevronLeft className="w-5 h-5 text-shopee-text" />
            </Link>
            <h1 className="text-lg font-medium text-shopee-text">Pesanan Saya</h1>
          </div>

          {/* Tabs */}
          <div className="bg-white lg:rounded-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-0 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs whitespace-nowrap transition-colors border-b-2 ${
                      active
                        ? "text-shopee-orange border-shopee-orange font-medium"
                        : "text-shopee-text-secondary border-transparent hover:text-shopee-text"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Orders List */}
          <div className="mt-3 space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white lg:rounded-sm p-10 text-center">
                <ClipboardList className="w-12 h-12 text-shopee-border mx-auto mb-3" />
                <p className="text-sm text-shopee-text-secondary">Belum ada pesanan di status ini.</p>
              </div>
            ) : (
              filtered.map((order) => (
                <div key={order.id} className="bg-white lg:rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-shopee-text-secondary">{order.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${statusColor[order.status] || "text-shopee-text-secondary bg-shopee-gray"}`}>
                      {statusLabel[order.status] || order.status}
                    </span>
                  </div>
                  <p className="text-sm text-shopee-text font-medium">{order.items}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-shopee-text-secondary">{order.date}</span>
                    <span className="text-sm text-shopee-orange font-medium">
                      Rp {order.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
