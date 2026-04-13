// lib/cart-utils.ts
import { Variant, CartItem, CartState } from "@/types/products";

export const calculateSellingPrice = (variant: Variant): number => {
  if (!variant.discount) return variant.mrpPrice;
  
  if (variant.discount.type === "percentage") {
    return variant.mrpPrice - (variant.mrpPrice * variant.discount.amount / 100);
  }
  
  // Flat discount
  return variant.mrpPrice - variant.discount.amount;
};

export const calculateDiscountAmount = (variant: Variant): number => {
  if (!variant.discount) return 0;
  return variant.mrpPrice - calculateSellingPrice(variant);
};

export const calculateDiscountPercentage = (variant: Variant): number => {
  if (!variant.discount || variant.discount.type !== "percentage") return 0;
  return variant.discount.amount;
};

export const getStockStatus = (variant: Variant): {
  inStock: boolean;
  stockLevel: "high" | "low" | "out";
  message: string;
} => {
  const quantity = variant.quantity;
  
  if (quantity === 0) {
    return { inStock: false, stockLevel: "out", message: "Out of Stock" };
  }
  if (quantity <= 5) {
    return { inStock: true, stockLevel: "low", message: `Only ${quantity} left in stock` };
  }
  return { inStock: true, stockLevel: "high", message: "In Stock" };
};

export const calculateCartTotals = (items: CartItem[]): Omit<CartState, "items"> => {
  let subtotal = 0;
  let grandTotal = 0;
  let totalItems = 0;
  
  items.forEach(item => {
    const itemSubtotal = item.variant.mrpPrice * item.quantity;
    const itemGrandTotal = calculateSellingPrice(item.variant) * item.quantity;
    
    subtotal += itemSubtotal;
    grandTotal += itemGrandTotal;
    totalItems += item.quantity;
  });
  
  return {
    totalItems,
    subtotal,
    grandTotal,
    totalSavings: subtotal - grandTotal,
  };
};