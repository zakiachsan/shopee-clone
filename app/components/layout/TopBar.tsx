"use client";

import { QrCode, Bell, HelpCircle, Globe } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-[#F5F5F5] text-[#757575] text-xs">
      <div className="max-w-[1200px] mx-auto px-4 h-[30px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hover:text-shopee-orange cursor-pointer transition-colors">
            Download aplikasi kami
          </span>
          <span className="flex items-center gap-1 hover:text-shopee-orange cursor-pointer transition-colors">
            <QrCode className="w-3.5 h-3.5" />
            QR Code
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 hover:text-shopee-orange cursor-pointer transition-colors">
            <Bell className="w-3.5 h-3.5" />
            Notifikasi
          </span>
          <span className="flex items-center gap-1 hover:text-shopee-orange cursor-pointer transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            Bantuan
          </span>
          <span className="flex items-center gap-1 hover:text-shopee-orange cursor-pointer transition-colors">
            <Globe className="w-3.5 h-3.5" />
            Bahasa Indonesia
          </span>
          <span className="hover:text-shopee-orange cursor-pointer transition-colors">
            Daftar
          </span>
          <span className="text-shopee-border">|</span>
          <span className="hover:text-shopee-orange cursor-pointer transition-colors">
            Masuk
          </span>
        </div>
      </div>
    </div>
  );
}
