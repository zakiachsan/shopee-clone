"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  List,
  Check,
  Star,
} from "lucide-react";
import Header from "@/app/components/layout/Header";
import BottomNav from "@/app/components/layout/BottomNav";
import Footer from "@/app/components/layout/Footer";
import ProductCard from "@/app/components/shared/ProductCard";
import { products, formatPrice } from "@/lib/data";

const categoryData: Record<string, { name: string; subcategories: string[]; banner: string }> = {
  elektronik: {
    name: "Elektronik",
    subcategories: ["Handphone", "Laptop", "Audio", "Kamera", "Aksesoris", "Smartwatch", "Drone", "Gaming"],
    banner: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=1200&h=200&fit=crop",
  },
  handphone: {
    name: "Handphone",
    subcategories: ["Android", "iPhone", "Aksesoris HP", "Powerbank", "Charger", "Casing", "Earphone"],
    banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=200&fit=crop",
  },
  "pakaian-pria": {
    name: "Pakaian Pria",
    subcategories: ["Kaos", "Kemeja", "Celana", "Jaket", "Hoodie", "Polo", "Formal"],
    banner: "https://images.unsplash.com/photo-1490578474895-699cd4d2ff84?w=1200&h=200&fit=crop",
  },
  "pakaian-wanita": {
    name: "Pakaian Wanita",
    subcategories: ["Blouse", "Dress", "Rok", "Jumpsuit", "Cardigan", "Hijab", "Atasan"],
    banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=200&fit=crop",
  },
  kecantikan: {
    name: "Kecantikan",
    subcategories: ["Skincare", "Makeup", "Parfum", "Perawatan Rambut", "Perawatan Tubuh", "Nail Art"],
    banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=200&fit=crop",
  },
  "tas-sepatu": {
    name: "Tas & Sepatu",
    subcategories: ["Tas Ransel", "Tas Selempang", "Sneakers", "Sepatu Formal", "Sandal", "Tas Wanita"],
    banner: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=200&fit=crop",
  },
  "rumah-tangga": {
    name: "Rumah Tangga",
    subcategories: ["Dapur", "Dekorasi", "Furniture", "Kebersihan", "Laundry", "Penyimpanan"],
    banner: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=200&fit=crop",
  },
  olahraga: {
    name: "Olahraga",
    subcategories: ["Running", "Gym", "Yoga", "Sepeda", "Futsal", "Badminton", "Renang"],
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=200&fit=crop",
  },
  makanan: {
    name: "Makanan",
    subcategories: ["Snack", "Makanan Instan", "Minuman", "Kesehatan", "Bahan Masak", "Kue"],
    banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=200&fit=crop",
  },
  komputer: {
    name: "Komputer",
    subcategories: ["Laptop", "PC Rakitan", "Monitor", "Keyboard", "Mouse", "Storage", "Networking"],
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=200&fit=crop",
  },
};

const defaultCategory = {
  name: "Kategori",
  subcategories: ["Semua", "Terlaris", "Terbaru", "Diskon", "Premium"],
  banner: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=200&fit=crop",
};

const priceRanges = [
  { label: "Di bawah Rp50rb", min: 0, max: 50000 },
  { label: "Rp50rb - Rp100rb", min: 50000, max: 100000 },
  { label: "Rp100rb - Rp250rb", min: 100000, max: 250000 },
  { label: "Rp250rb - Rp500rb", min: 250000, max: 500000 },
  { label: "Di atas Rp500rb", min: 500000, max: Infinity },
];

const locations = ["Jakarta", "Bandung", "Surabaya", "Tangerang", "Semarang"];

const ratings = [4, 3, 2];

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const category = categoryData[slug] || { ...defaultCategory, name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) };

  const [sortBy, setSortBy] = useState("populer");
  const [selectedSub, setSelectedSub] = useState("Semua");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(category.name.toLowerCase()) ||
      category.subcategories.some((sub) =>
        p.name.toLowerCase().includes(sub.toLowerCase())
      ) ||
      slug === "elektronik"
    );

    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    if (selectedLocation) {
      result = result.filter((p) => p.location === selectedLocation);
    }

    if (selectedRating) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case "termurah":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "termahal":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "terlaris":
        result = [...result].sort(() => Math.random() - 0.5);
        break;
      case "terbaru":
        result = [...result].reverse();
        break;
      default:
        break;
    }

    return result;
  }, [category, selectedPrice, selectedLocation, selectedRating, sortBy, slug]);

  const clearFilters = () => {
    setSelectedPrice(null);
    setSelectedLocation(null);
    setSelectedRating(null);
    setSelectedSub("Semua");
  };

  const activeFiltersCount = [selectedPrice, selectedLocation, selectedRating].filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="flex-1 bg-shopee-gray pb-20 lg:pb-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-white sticky top-0 z-40 border-b border-shopee-border">
          <Link href="/" className="p-1">
            <ChevronLeft className="w-5 h-5 text-shopee-text" />
          </Link>
          <span className="text-sm font-medium text-shopee-text">{category.name}</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-0 lg:px-4 py-0 lg:py-4">
          {/* Breadcrumb Desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-shopee-text-secondary mb-3 px-1">
            <Link href="/" className="hover:text-shopee-orange">Beranda</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-shopee-text">{category.name}</span>
          </div>

          {/* Banner */}
          <div className="relative h-[120px] md:h-[160px] rounded-sm overflow-hidden mb-4">
            <img src={category.banner} alt={category.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-6">
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">{category.name}</h1>
                <p className="text-white/80 text-sm mt-1">{filteredProducts.length} Produk ditemukan</p>
              </div>
            </div>
          </div>

          {/* Sub Categories */}
          <div className="bg-white rounded-sm p-3 mb-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs transition-colors ${
                    selectedSub === sub
                      ? "bg-shopee-orange text-white"
                      : "bg-shopee-gray text-shopee-text hover:bg-shopee-orange-light hover:text-shopee-orange"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar Filter Desktop */}
            <div className="hidden lg:block w-[220px] flex-shrink-0">
              <div className="bg-white rounded-sm p-4 sticky top-[120px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm text-shopee-text">
                    <SlidersHorizontal className="w-4 h-4 inline mr-1" />
                    Filter
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-shopee-orange hover:underline">
                      Hapus ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Price Filter */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-shopee-text mb-2">Rentang Harga</h4>
                  <div className="space-y-1.5">
                    {priceRanges.map((range, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative w-4 h-4">
                          <input
                            type="radio"
                            name="price"
                            checked={selectedPrice === idx}
                            onChange={() => setSelectedPrice(idx)}
                            className="w-4 h-4 accent-shopee-orange cursor-pointer"
                          />
                        </div>
                        <span className={`text-xs ${selectedPrice === idx ? "text-shopee-orange font-medium" : "text-shopee-text-secondary group-hover:text-shopee-text"}`}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-shopee-text mb-2">Lokasi</h4>
                  <div className="space-y-1.5">
                    {locations.map((loc) => (
                      <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="location"
                          checked={selectedLocation === loc}
                          onChange={() => setSelectedLocation(loc)}
                          className="w-4 h-4 accent-shopee-orange cursor-pointer"
                        />
                        <span className={`text-xs ${selectedLocation === loc ? "text-shopee-orange font-medium" : "text-shopee-text-secondary group-hover:text-shopee-text"}`}>
                          {loc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-sm font-medium text-shopee-text mb-2">Rating</h4>
                  <div className="space-y-1.5">
                    {ratings.map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                          className="w-4 h-4 accent-shopee-orange cursor-pointer"
                        />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rating ? "text-shopee-yellow fill-shopee-yellow" : "text-shopee-border"}`}
                            />
                          ))}
                          <span className="text-xs text-shopee-text-secondary ml-1">Ke atas</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="bg-white rounded-sm p-3 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  <span className="text-xs text-shopee-text-secondary whitespace-nowrap mr-1">Urutkan:</span>
                  {[
                    { id: "populer", label: "Populer" },
                    { id: "terbaru", label: "Terbaru" },
                    { id: "terlaris", label: "Terlaris" },
                    { id: "termurah", label: "Harga: Rendah ke Tinggi" },
                    { id: "termahal", label: "Harga: Tinggi ke Rendah" },
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => setSortBy(sort.id)}
                      className={`px-3 py-1.5 text-xs rounded-sm whitespace-nowrap transition-colors ${
                        sortBy === sort.id
                          ? "bg-shopee-orange text-white"
                          : "text-shopee-text hover:text-shopee-orange"
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-1 ml-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${viewMode === "grid" ? "text-shopee-orange bg-shopee-orange-light" : "text-shopee-text-secondary"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded ${viewMode === "list" ? "text-shopee-orange bg-shopee-orange-light" : "text-shopee-text-secondary"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden px-3 mb-3">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="w-full bg-white rounded-sm p-3 flex items-center justify-between text-sm text-shopee-text"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                    {activeFiltersCount > 0 && (
                      <span className="bg-shopee-orange text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeFiltersCount}</span>
                    )}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showMobileFilter ? "rotate-90" : ""}`} />
                </button>
                {showMobileFilter && (
                  <div className="bg-white rounded-sm mt-2 p-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Harga</h4>
                      <div className="space-y-2">
                        {priceRanges.map((range, idx) => (
                          <label key={idx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="mprice"
                              checked={selectedPrice === idx}
                              onChange={() => setSelectedPrice(idx)}
                              className="w-4 h-4 accent-shopee-orange"
                            />
                            <span className="text-xs text-shopee-text">{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Lokasi</h4>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setSelectedLocation(selectedLocation === loc ? null : loc)}
                            className={`px-3 py-1 text-xs rounded-full border ${
                              selectedLocation === loc
                                ? "border-shopee-orange text-shopee-orange bg-shopee-orange-light"
                                : "border-shopee-border text-shopee-text"
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 bg-shopee-orange text-white text-sm rounded-sm"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-2 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
                  {filteredProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-sm py-16 text-center">
                  <p className="text-shopee-text-secondary text-sm">Tidak ada produk yang cocok dengan filter</p>
                  <button onClick={clearFilters} className="mt-3 px-6 py-2 bg-shopee-orange text-white text-sm rounded-sm hover:bg-[#D7391D]">
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
