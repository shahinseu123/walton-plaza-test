"use client";

import { CartItemSkeleton } from "./CartItemSkeleton";

export function CartSkeleton() {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="md:col-span-6">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="md:col-span-2 text-center">
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div className="md:col-span-2 text-center">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div className="md:col-span-2 text-right">
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse ml-auto"></div>
            </div>
          </div>

          {[1, 2, 3].map((i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 mt-8 lg:mt-0">
        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="h-10 w-full bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}