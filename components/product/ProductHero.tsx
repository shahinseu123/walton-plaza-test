"use client"
import { useState } from "react";

export const ProductHero = ({ product }: { product: any }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const mrp = selectedVariant.mrpPrice;
  const sellingPrice = selectedVariant.discount?.value || mrp;
  const discountAmount = selectedVariant.discount?.amount;
  const discountType = selectedVariant.discount?.type;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.enName}</h1>
      
      <div className="flex items-center gap-4">
        <span className="text-4xl font-black text-blue-700">৳{sellingPrice}</span>
        {discountAmount > 0 && (
          <>
            <span className="text-xl text-gray-400 line-through">৳{mrp}</span>
            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
              {discountType === 'percentage' ? `${discountAmount}% OFF` : `৳${discountAmount} OFF`}
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <p className={`font-medium ${selectedVariant.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {selectedVariant.quantity > 0 ? `In Stock (${selectedVariant.quantity} units)` : 'Out of Stock'}
      </p>

      {/* Buy Button */}
      <button 
        disabled={selectedVariant.quantity === 0}
        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all disabled:bg-gray-300"
      >
        {selectedVariant.quantity > 0 ? 'ADD TO CART' : 'NOTIFY ME'}
      </button>
    </div>
  );
};