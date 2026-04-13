"use client";

import { PromoCodeForm } from "./PromoCodeForm";
import { CheckoutButton } from "./CheckoutButton";

interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  grandTotal: number;
}

export function OrderSummary({
  totalItems,
  subtotal,
  totalSavings,
  grandTotal,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-gray-900">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Total Savings</span>
            <span className="text-green-600 font-medium">
              - ৳{totalSavings.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-base font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              ৳{grandTotal.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
        </div>
      </div>

      <PromoCodeForm />

      <div className="mt-6">
        <CheckoutButton grandTotal={grandTotal} />
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-3">
          Secure payment with
        </p>
        <div className="flex justify-center gap-3">
          <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-semibold text-gray-600">
            VISA
          </div>
          <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-semibold text-gray-600">
            Mastercard
          </div>
          <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-semibold text-gray-600">
            Amex
          </div>
          <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-semibold text-gray-600">
            bkash
          </div>
        </div>
      </div>
    </div>
  );
}
