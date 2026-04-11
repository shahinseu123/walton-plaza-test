"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);
  
  const categories = [
    "Refrigerator",
    "Television", 
    "Air Conditioner",
    "Laptop",
    "Mobile",
    "Washing Machine"
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Top Bar - Subtle info */}
      <div className="hidden bg-gray-900 py-2 text-center text-xs font-medium text-white md:block">
        Free Shipping on orders over ৳50,000 | 
        <span className="ml-2 text-blue-400 cursor-pointer hover:underline">
          <Phone className="inline-block w-3 h-3 mr-1" /> 24/7 Support: 09612-345678
        </span>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden p-4 bg-white border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <div className="flex shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900">
              WALTON<span className="text-blue-600">PLAZA</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-6">
            {categories.slice(0, 4).map((item) => (
              <Link 
                key={item} 
                href={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                More +
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {categories.slice(4).map((item) => (
                  <Link
                    key={item}
                    href={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Search Bar - Desktop */}
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
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Account Link */}
            <Link 
              href="/account" 
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            {/* Cart Link with Zustand Integration */}
            <Link 
              href="/cart" 
              className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              
              {/* Cart Badge - Connected to Zustand */}
              {totalItems > 0 && (
                <>
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[9px] sm:text-[10px] font-bold text-white ring-2 ring-white">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                  {/* Pulsing animation for new items */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 animate-ping opacity-75">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                </>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 lg:hidden transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {categories.map((item) => (
                <Link
                  key={item}
                  href={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-4 w-4" />
                  <span>Need help? Call 09612-345678</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}