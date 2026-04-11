// app/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { calculateSellingPrice } from "@/libs/cart-util";
import { toast } from "sonner";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    items, 
    totalItems, 
    subtotal, 
    totalSavings, 
    grandTotal,
    updateQuantity,
    removeItem,
    clearCart 
  } = useCartStore();

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    toast.success("Quantity updated");
  };

  const handleRemoveItem = (id: string, productName: string) => {
    removeItem(id);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared");
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Redirecting to checkout...");
      // router.push('/checkout');
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-32 w-32 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-gray-500">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-500">
            You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const sellingPrice = calculateSellingPrice(item.variant);
                  const itemTotal = sellingPrice * item.quantity;
                  const originalTotal = item.variant.mrpPrice * item.quantity;
                  const savings = originalTotal - itemTotal;
                  
                  return (
                    <div key={item.id} className="p-6">
                      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                        {/* Product Info */}
                        <div className="md:col-span-6">
                          <div className="flex gap-4">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                              <Image
                                src={item.image}
                                alt={item.productName}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <div className="flex-1">
                              <Link
                                href={`/product/${item.productUid}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                              >
                                {item.productName}
                              </Link>
                              <p className="mt-1 text-sm text-gray-500">
                                SKU: {item.variant.posItemCode}
                              </p>
                              {item.variant.discount && (
                                <p className="mt-1 text-xs text-green-600">
                                  Save ৳{(item.variant.mrpPrice - sellingPrice).toLocaleString()} per item
                                </p>
                              )}
                              <button
                                onClick={() => handleRemoveItem(item.id, item.productName)}
                                className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mt-4 md:mt-0 md:col-span-2">
                          <div className="text-center">
                            <span className="font-semibold text-gray-900">
                              ৳{sellingPrice.toLocaleString()}
                            </span>
                            {item.variant.discount && (
                              <span className="ml-2 text-xs text-gray-400 line-through">
                                ৳{item.variant.mrpPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-4 md:mt-0 md:col-span-2">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.variant.quantity}
                                className="px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {item.quantity >= item.variant.quantity && (
                            <p className="text-xs text-orange-600 text-center mt-1">
                              Max stock reached
                            </p>
                          )}
                        </div>

                        {/* Total */}
                        <div className="mt-4 md:mt-0 md:col-span-2">
                          <div className="text-right">
                            <span className="font-bold text-gray-900">
                              ৳{itemTotal.toLocaleString()}
                            </span>
                            {savings > 0 && (
                              <p className="text-xs text-green-600">
                                Saved: ৳{savings.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                  <Link
                    href="/products"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
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
                  <p className="text-xs text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-6 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-bold hover:from-gray-800 hover:to-gray-900 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
              
              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">
                  We accept
                </p>
                <div className="flex justify-center gap-4">
                  <svg className="h-8 w-auto" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="4" fill="#1F1F1F" />
                    <text x="19" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text>
                  </svg>
                  <svg className="h-8 w-auto" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="4" fill="#1A1A1A" />
                    <text x="19" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Mastercard</text>
                  </svg>
                  <svg className="h-8 w-auto" viewBox="0 0 38 24" fill="none">
                    <rect width="38" height="24" rx="4" fill="#003087" />
                    <text x="19" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Amex</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Add recommended products here */}
            <div className="bg-white rounded-xl p-4 text-center text-gray-500">
              Recommended products will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}