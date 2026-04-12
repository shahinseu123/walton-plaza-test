"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mt-2 text-gray-500">
          Looks like you haven't added any items to your cart yet.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            Start Shopping
          </Link>

          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
