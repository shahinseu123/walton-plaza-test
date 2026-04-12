"use client";

import { Variant } from "@/types";
import { calculateSellingPrice, calculateDiscountAmount, calculateDiscountPercentage, formatPrice } from "@/lib/price-utils";

interface PriceSectionProps {
  variant: Variant | null | undefined;
}

export function PriceSection({ variant }: PriceSectionProps) {
  if (!variant) {
    return <div className="text-2xl font-bold text-gray-900">Price unavailable</div>;
  }

  const sellingPrice = calculateSellingPrice(variant);
  const originalPrice = variant.mrpPrice;
  const discountPercent = calculateDiscountPercentage(variant);
  const discountAmount = calculateDiscountAmount(variant);
  const hasDiscount = discountPercent > 0 && discountAmount > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl font-bold text-gray-900">
          {formatPrice(sellingPrice)}
        </span>
        
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm font-semibold">
              -{discountPercent}% OFF
            </span>
          </>
        )}
      </div>
      
      {hasDiscount && (
        <p className="text-green-600 text-sm font-medium">
          You save {formatPrice(discountAmount)} ({discountPercent}% OFF)
        </p>
      )}
      
      <p className="text-sm text-gray-500">Inclusive of all taxes</p>
    </div>
  );
}