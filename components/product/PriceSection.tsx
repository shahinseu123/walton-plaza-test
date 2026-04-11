// components/product/PriceSection.tsx
"use client";
import { Variant } from "@/types";

interface PriceSectionProps {
  variant: Variant | null;
}

export function PriceSection({ variant }: PriceSectionProps) {
  const getEffectivePrice = (): number => {
    if (!variant) return 0;
    const { mrpPrice, discount } = variant;
    if (!discount) return mrpPrice;
    if (discount.type === "percentage") {
      return mrpPrice - (mrpPrice * discount.value / 100);
    }
    return mrpPrice - discount.value;
  };

  const getDiscountPercentage = (): number => {
    if (!variant?.discount || variant.discount.type !== "percentage") return 0;
    return variant.discount.value;
  };

  const currentPrice = getEffectivePrice();
  const originalPrice = variant?.mrpPrice || 0;
  const discountPercent = getDiscountPercentage();
  const savings = originalPrice - currentPrice;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gray-900">
          ${currentPrice.toFixed(2)}
        </span>
        {discountPercent > 0 && (
          <>
            <span className="text-lg text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm font-semibold">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>
      {savings > 0 && (
        <div className="text-green-600 text-sm font-medium">
          You save ${savings.toFixed(2)} ({discountPercent}% OFF)
        </div>
      )}
      {variant?.discount?.type === "flat" && (
        <div className="text-green-600 text-sm font-medium">
          Flat ${variant.discount.value} OFF
        </div>
      )}
      <div className="text-sm text-gray-500">
        Inclusive of all taxes
      </div>
    </div>
  );
}