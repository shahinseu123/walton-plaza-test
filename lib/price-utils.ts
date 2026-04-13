// lib/price-utils.ts
import { Variant } from "@/types/products";

export function calculateSellingPrice(variant: Variant | null | undefined): number {
  if (!variant) return 0;
  if (!variant.mrpPrice) return 0;
  
  // If no discount, return MRP
  if (!variant.discount) {
    return variant.mrpPrice;
  }
  
  // Use discount.value if available (API provides pre-calculated value)
  if (variant.discount.value && typeof variant.discount.value === 'number' && variant.discount.value > 0) {
    return variant.discount.value;
  }
  
  // Calculate manually
  const discountAmount = variant.discount.amount || 0;
  
  if (variant.discount.type === 'percentage') {
    return variant.mrpPrice - (variant.mrpPrice * discountAmount / 100);
  } else if (variant.discount.type === 'flat') {
    return variant.mrpPrice - discountAmount;
  }
  
  return variant.mrpPrice;
}

export function calculateDiscountAmount(variant: Variant | null | undefined): number {
  if (!variant) return 0;
  if (!variant.discount) return 0;
  
  const sellingPrice = calculateSellingPrice(variant);
  return variant.mrpPrice - sellingPrice;
}

export function calculateDiscountPercentage(variant: Variant | null | undefined): number {
  if (!variant) return 0;
  if (!variant.discount) return 0;
  
  // If discount type is percentage, return the amount directly
  if (variant.discount.type === 'percentage') {
    return variant.discount.amount || 0;
  }
  
  // For flat discount, calculate percentage
  const discountAmount = calculateDiscountAmount(variant);
  if (variant.mrpPrice === 0) return 0;
  return Math.round((discountAmount / variant.mrpPrice) * 100);
}

export function formatPrice(price: number): string {
  if (!price || isNaN(price)) return '৳0';
  return `৳${price.toLocaleString()}`;
}

export function getStockStatus(variant: Variant | null | undefined) {
  const quantity = variant?.quantity || 0;
  
  if (quantity === 0) {
    return { inStock: false, message: "Out of Stock", textColor: "text-red-600" };
  }
  if (quantity <= 5) {
    return { inStock: true, message: `Only ${quantity} left`, textColor: "text-orange-600" };
  }
  return { inStock: true, message: "In Stock", textColor: "text-green-600" };
}