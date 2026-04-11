// components/product/ProductActions.tsx
"use client";
import { useState } from "react";
import { Variant } from "@/types";

interface ProductActionsProps {
  variants: Variant[];
}

export function ProductActions({ variants }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  const getEffectivePrice = (variant: Variant | null): number => {
    if (!variant) return 0;
    const { mrpPrice, discount } = variant;
    if (!discount) return mrpPrice;
    if (discount.type === "percentage") {
      return mrpPrice - (mrpPrice * discount.value / 100);
    }
    return mrpPrice - discount.value;
  };

  const getTotalPrice = () => {
    return (getEffectivePrice(selectedVariant) * quantity).toFixed(2);
  };

  const getDiscountAmount = () => {
    if (!selectedVariant?.discount) return 0;
    const originalTotal = selectedVariant.mrpPrice * quantity;
    const finalTotal = getEffectivePrice(selectedVariant) * quantity;
    return (originalTotal - finalTotal).toFixed(2);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.quantity || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      variant: selectedVariant,
      quantity,
      total: getTotalPrice(),
    });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      variant: selectedVariant,
      quantity,
      total: getTotalPrice(),
    });
  };

  const inStock = (selectedVariant?.quantity || 0) > 0;
  const stockCount = selectedVariant?.quantity || 0;

  return (
    <div className="py-6 space-y-6">
      {/* Variant Selector (if multiple variants) */}
      {variants && variants.length > 1 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Choose Variant
          </label>
          <div className="grid grid-cols-2 gap-3">
            {variants.map((variant) => {
              const isSelected = selectedVariant?.ebsItemCode === variant.ebsItemCode;
              const isInStock = variant.quantity > 0;
              
              return (
                <button
                  key={variant.ebsItemCode}
                  onClick={() => handleVariantChange(variant)}
                  disabled={!isInStock}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-offset-2"
                      : "border-gray-200 hover:border-gray-400"
                  } ${!isInStock && "opacity-50 cursor-not-allowed bg-gray-50"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-gray-500">
                      {variant.posItemCode}
                    </span>
                    {!isInStock && (
                      <span className="text-xs text-red-500 font-semibold">
                        Out of Stock
                      </span>
                    )}
                    {isInStock && isSelected && (
                      <span className="text-xs text-green-600 font-semibold">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${getEffectivePrice(variant).toFixed(2)}
                  </div>
                  {variant.discount && (
                    <div className="text-xs text-green-600 mt-1">
                      Save ${(variant.mrpPrice - getEffectivePrice(variant)).toFixed(2)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-full bg-white">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || !inStock}
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
              disabled={quantity >= stockCount || !inStock}
              className="p-3 rounded-r-full hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {inStock && (
            <div className="text-sm text-gray-500">
              {stockCount} items available
            </div>
          )}
        </div>
      </div>

      {/* Price Summary */}
      {selectedVariant && (
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
            <span className="font-semibold text-gray-900">${getTotalPrice()}</span>
          </div>
          {selectedVariant.discount && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">You Save</span>
              <span className="text-green-600 font-semibold">${getDiscountAmount()}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-gray-900">${getTotalPrice()}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full bg-gray-900 text-white px-6 py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg hover:shadow-xl"
        >
          {inStock ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </span>
          ) : (
            "Out of Stock"
          )}
        </button>
        
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg hover:shadow-xl"
        >
          Buy Now
        </button>

        {/* Additional actions */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Wishlist
          </button>
          <button className="py-3 px-6 border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stock Status Message */}
      {!inStock && selectedVariant && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Out of Stock</span>
          </div>
          <p className="text-sm text-red-600 mt-1">
            This variant is currently out of stock. Please check back later or select another variant.
          </p>
        </div>
      )}

      {inStock && stockCount <= 5 && stockCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Only {stockCount} left in stock!</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Order soon before it runs out.
          </p>
        </div>
      )}
    </div>
  );
}