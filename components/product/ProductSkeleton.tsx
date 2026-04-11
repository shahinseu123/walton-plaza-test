// components/ui/ProductSkeleton.tsx
export const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
    {/* Title Placeholder */}
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    {/* Category Placeholder */}
    <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
    {/* Price Placeholder */}
    <div className="h-6 bg-gray-200 rounded w-1/4" />
  </div>
);

