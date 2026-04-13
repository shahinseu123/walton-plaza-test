"use client";

import { useActionState } from "react";

async function applyPromoCode(prevState: any, formData: FormData) {
  const promoCode = formData.get('promoCode');
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (promoCode === 'SAVE20') {
    return { 
      success: true, 
      discount: 20, 
      message: '🎉 Promo code applied! You saved 20%' 
    };
  } else if (promoCode === 'FREESHIP') {
    return { 
      success: true, 
      discount: 'free_shipping', 
      message: '🎉 Free shipping applied!' 
    };
  } else if (promoCode && promoCode !== '') {
    return { 
      success: false, 
      error: 'Invalid promo code' 
    };
  }
  
  return prevState;
}

export function PromoCodeForm() {
  const [state, formAction] = useActionState(applyPromoCode, null);

  return (
    <form action={formAction} className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Promo Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          name="promoCode"
          placeholder="Enter code (SAVE20)"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>
      </div>
      
      {state?.error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <span>⚠️</span> {state.error}
        </p>
      )}
      
      {state?.success && (
        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
          <span>✓</span> {state.message}
        </p>
      )}
    </form>
  );
}