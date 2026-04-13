export interface ProductVariant {
  mrpPrice: number;
  ebsItemCode: string;
  posItemCode: string;
  quantity: number;
  discount: {
    amount: number;
    value: number;
    type: 'flat' | 'percentage';
  } | null;
}

export interface ProductImage {
  url: string;
}

export interface ProductAttribute {
  enLabel: string;
  values: Array<{ enName: string }>;
}

export interface Product {
  uid: string;
  enName: string;
  images: ProductImage[];
  variants: ProductVariant[];
  productAttributes?: ProductAttribute[];
  detailedDescriptions?: ProductAttribute[];
  deliveries?: ProductAttribute[];
  serviceAndDeliveries?: ProductAttribute[];
  priceAndStocks?: ProductAttribute[];
}

export interface GetProductsResponse {
  getProducts: {
    message: string;
    statusCode: number;
    result: {
      count: number;
      products: Product[];
    };
  };
}

// Helper function to get the best variant (first one with stock, or first one)
export function getBestVariant(product: Product): ProductVariant | null {
  if (!product.variants || product.variants.length === 0) return null;
  
  const inStockVariant = product.variants.find(v => v.quantity > 0);
  return inStockVariant || product.variants[0];
}

// Helper to calculate selling price
export function getSellingPrice(variant: ProductVariant): number {
  if (!variant.discount) return variant.mrpPrice;
  
  if (variant.discount.type === 'flat') {
    return variant.mrpPrice - variant.discount.amount;
  } else if (variant.discount.type === 'percentage') {
    return variant.mrpPrice - (variant.mrpPrice * variant.discount.amount / 100);
  }
  return variant.mrpPrice;
}

// Helper to get discount badge text
export function getDiscountBadge(variant: ProductVariant): string | null {
  if (!variant.discount) return null;
  
  if (variant.discount.type === 'percentage') {
    return `${variant.discount.amount}% OFF`;
  } else if (variant.discount.type === 'flat') {
    return `Save ৳${variant.discount.amount}`;
  }
  return null;
}