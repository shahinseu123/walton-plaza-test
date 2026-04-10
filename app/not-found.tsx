import Link from "next/link";
import Image from "next/image";
import ImageNotFound from "../image/404.png"
import { Search, Home, ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[90vh] flex-col bg-white">
      {/* 1. Subtle, Professional Top-Bar for branding (if not in Layout) */}
      {/* <div className="border-b border-gray-100 py-3">
        <div className="mx-auto max-w-7xl px-4 text-left">
          <Link href="/" className="text-xl font-black tracking-tighter text-gray-900">
            WALTON<span className="text-blue-600">PLAZA</span>
          </Link>
        </div>
      </div> 
      */}

      {/* 2. Main 404 Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            
            {/* 3. Left Side: Large Text & Info */}
            <div>
              <div className="mb-3 flex items-center justify-center md:justify-start gap-3">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Status 404
                </span>
                <span className="text-3xl">😕</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl">
                Whoops! That page is currently unavailable.
              </h1>
              
              <p className="mb-10 max-w-xl mx-auto md:mx-0 text-xl text-gray-600">
                It seems like the link you followed might be broken, or the item has been removed from our catalog. Let’s get you back on track to find the right appliance for your home.
              </p>

              {/* 4. Help Actions */}
              <div className="space-y-6">
                
                {/* Search - High Utility */}
                <div className="relative max-w-lg mx-auto md:mx-0">
                  <input
                    type="text"
                    placeholder="Search for TVs, ACs, or Fridges..."
                    className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-6 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <button className="absolute right-2.5 top-2 rounded-full bg-gray-950 px-5 py-1.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                    Search
                  </button>
                </div>

                {/* Primary Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 rounded-full bg-gray-950 px-8 py-3.5 text-base font-bold text-white shadow-xl hover:bg-gray-800 active:scale-95 transition-all"
                  >
                    <Home className="h-5 w-5" />
                    Back to Home
                  </Link>
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-900 bg-white px-8 py-3.5 text-base font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                  >
                    Explore Popular Products
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </div>

            
            
          </div>
        </div>
      </main>
    </div>
  );
}