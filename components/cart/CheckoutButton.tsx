"use client";

import { useFormStatus } from "react-dom";
import { ShoppingBag } from "lucide-react";

interface CheckoutButtonProps {
  grandTotal: number;
}

function CheckoutButtonContent({ grandTotal }: CheckoutButtonProps) {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-bold hover:from-gray-800 hover:to-gray-900 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Proceed to Checkout · ৳{grandTotal.toLocaleString()}
        </span>
      )}
    </button>
  );
}

export function CheckoutButton(props: CheckoutButtonProps) {
  return (
    <form action="/checkout" method="POST">
      <CheckoutButtonContent {...props} />
    </form>
  );
}