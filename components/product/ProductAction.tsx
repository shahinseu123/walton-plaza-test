// components/product/ProductActions.tsx
"use client";

import { useState, useTransition } from "react";
import { Product, Variant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { calculateSellingPrice, getStockStatus } from "@/libs/cart-util";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
  variants: Variant[];
}

export function ProductActions({ product, variants }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const addItem = useCartStore((state) => state.addItem);
  
  if (!selectedVariant) return null;
  
  const sellingPrice = calculateSellingPrice(selectedVariant);
  const stockStatus = getStockStatus(selectedVariant);
  const totalPrice = sellingPrice * quantity;
  const savings = (selectedVariant.mrpPrice - sellingPrice) * quantity;
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= selectedVariant.quantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    startTransition(() => {
      addItem(product, selectedVariant, quantity);
      
      toast.success(
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-semibold">{product.enName}</p>
            <p className="text-sm text-green-600">
              {quantity} item(s) added to cart
            </p>
          </div>
        </div>,
        {
          duration: 2000,
          position: "bottom-right",
        }
      );
    });
  };
  
  const handleBuyNow = () => {
    if (!stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    // Add to cart first, then redirect to checkout
    addItem(product, selectedVariant, quantity);
    toast.success("Redirecting to checkout...");
    // router.push('/checkout'); // Uncomment when you have checkout page
  };
  
  return (
    <div className="py-6 space-y-6">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-full bg-white">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || !stockStatus.inStock}
              className="p-3 rounded-l-full hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-16 text-center font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= selectedVariant.quantity || !stockStatus.inStock}
              className="p-3 rounded-r-full hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {stockStatus.inStock && (
            <div className="text-sm text-gray-500">
              {selectedVariant.quantity} items available
            </div>
          )}
        </div>
      </div>
      
      {/* Price Summary */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({quantity} item{quantity > 1 ? 's' : ''})
          </span>
          <span className="font-semibold text-gray-900">
            ৳{totalPrice.toLocaleString()}
          </span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">You Save</span>
            <span className="text-green-600 font-semibold">
              - ৳{savings.toLocaleString()}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-gray-900">৳{totalPrice.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!stockStatus.inStock || isPending}
          className="w-full bg-gray-900 text-white px-6 py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding to Cart...
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
        
        <button
          onClick={handleBuyNow}
          disabled={!stockStatus.inStock}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Buy Now
        </button>
        
        {/* Stock Status Message */}
        {!stockStatus.inStock && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Out of Stock</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              This variant is currently out of stock. Please check back later.
            </p>
          </div>
        )}
        
        {stockStatus.inStock && stockStatus.stockLevel === "low" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-yellow-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Only {selectedVariant.quantity} left in stock!</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Order soon before it runs out.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}