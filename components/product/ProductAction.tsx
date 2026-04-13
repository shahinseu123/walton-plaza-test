"use client";

import { useState, useTransition } from "react";
import { Product, Variant } from "@/types/products";
import { useCartStore } from "@/store/useCartStore";
import { calculateSellingPrice, formatPrice, getStockStatus } from "@/lib/price-utils";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart, Heart, Bolt } from "lucide-react";

interface ProductActionsProps {
  product: Product;
  variants: Variant[];
}

export function ProductActions({ product, variants }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const addItem = useCartStore((state) => state.addItem);
  
  if (!selectedVariant) {
    return <div className="py-6 text-center text-red-600">No variants available</div>;
  }
  
  const sellingPrice = calculateSellingPrice(selectedVariant);
  const stockStatus = getStockStatus(selectedVariant);
  const totalPrice = sellingPrice * quantity;
  const originalTotal = selectedVariant.mrpPrice * quantity;
  const totalSavings = originalTotal - totalPrice;
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= selectedVariant.quantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    startTransition(() => {
      addItem(product, selectedVariant, quantity);
      toast.success(`${quantity} × ${product.enName} added to cart`);
    });
  };
  
  const handleBuyNow = () => {
    if (!stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    addItem(product, selectedVariant, quantity);
    toast.success("Redirecting to checkout...");
  };
  
  return (
    <div className="py-6 space-y-6">
      {/* Stock Status */}
      <div className={`flex items-center gap-2 ${stockStatus.textColor}`}>
        <div className={`w-2 h-2 rounded-full ${stockStatus.inStock ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
        <span className="font-medium">{stockStatus.message}</span>
        {stockStatus.inStock && (
          <span className="text-sm text-gray-500">({selectedVariant.quantity} units available)</span>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-full bg-white">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || !stockStatus.inStock}
              className="p-3 rounded-l-full hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-16 text-center font-semibold text-gray-900">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= selectedVariant.quantity || !stockStatus.inStock}
              className="p-3 rounded-r-full hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
          <span className="font-semibold text-gray-900">{formatPrice(totalPrice)}</span>
        </div>
        
        {totalSavings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">You Save</span>
            <span className="text-green-600 font-semibold">- {formatPrice(totalSavings)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-gray-900">{formatPrice(totalPrice)}</span>
        </div>
      </div>
      
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!stockStatus.inStock || isPending}
          className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
        <button className="p-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <button
        onClick={handleBuyNow}
        disabled={!stockStatus.inStock}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform active:scale-95 disabled:opacity-50"
      >
        <Bolt className="w-4 h-4 inline mr-2" />
        Buy Now
      </button>
    </div>
  );
}