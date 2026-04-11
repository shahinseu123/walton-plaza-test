export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  productAttributes: AttributeSection[] | null;
  detailedDescriptions: AttributeSection[] | null;
  deliveries: AttributeSection[] | null;
  serviceAndDeliveries: AttributeSection[] | null;
  priceAndStocks: AttributeSection[] | null;
  variants: Variant[];
}

export interface AttributeSection {
  enLabel: string;
  values: { enName: string }[];
}

export interface Variant {
  mrpPrice: number;
  quantity: number;
  ebsItemCode: string;
  posItemCode: string;
  discount: {
    amount: number;
    value: number;
    type: "flat" | "percentage";
  } | null;
}

// types/product.ts
export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  productAttributes: AttributeSection[] | null;
  detailedDescriptions: AttributeSection[] | null;
  deliveries: AttributeSection[] | null;
  serviceAndDeliveries: AttributeSection[] | null;
  priceAndStocks: AttributeSection[] | null;
  variants: Variant[];
}

export interface AttributeSection {
  enLabel: string;
  values: { enName: string }[];
}

export interface Variant {
  mrpPrice: number;
  quantity: number;
  ebsItemCode: string;
  posItemCode: string;
  discount: {
    amount: number;
    value: number;
    type: "flat" | "percentage";
  } | null;
}

export interface CartItem {
  id: string; 
  productUid: string;
  productName: string;
  variant: Variant;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  grandTotal: number;
}

export interface CartActions {
  addItem: (product: Product, variant: Variant, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItemById: (id: string) => CartItem | undefined;
}

export type CartStore = CartState & CartActions;
