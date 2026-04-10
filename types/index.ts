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