import { Variant } from "@/types";

export function calculateSellingPrice(variant: Variant) {
  const { mrpPrice, discount } = variant;
  
  if (!discount) return mrpPrice;
  
  // Though discount.value is provided, the doc suggests 
  // having the formula ready for badges/validation.
  if (discount.type === "flat") {
    return mrpPrice - discount.amount;
  } else {
    return mrpPrice - (mrpPrice * discount.amount) / 100;
  }
}

export function formatCurrency(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}