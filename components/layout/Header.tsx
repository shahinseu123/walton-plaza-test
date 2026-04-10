"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Phone } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Top Bar - Subtle info */}
      <div className="hidden bg-gray-900 py-2 text-center text-xs font-medium text-white md:block">
        Free Shipping on orders over ৳50,000 | 
        <span className="ml-2 text-blue-400 cursor-pointer hover:underline">
          <Phone className="inline-block w-3 h-3 mr-1" /> Contact Support
        </span>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <div className="flex shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900">
              WALTON<span className="text-blue-600">PLAZA</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {["Refrigerator", "Television", "Air Conditioner", "Laptop"].map((item) => (
              <Link 
                key={item} 
                href={`/category/${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 3. Search Bar - Center */}
          <div className="hidden flex-1 max-w-md md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* 4. Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 md:hidden">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/account" className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
              <User className="h-6 w-6" />
            </Link>

            <Link href="/cart" className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
              {/* Cart Badge - Connect to Zustand later */}
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                3
              </span>
            </Link>

            <button 
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}