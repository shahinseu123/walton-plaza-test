import { ProductSkeleton } from "./ProductSkeleton";
export const ProductListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(12)].map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
);