"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Product } from "@/types/products";
import { useCartStore } from "@/store/useCartStore";
import { calculateSellingPrice, calculateDiscountPercentage, getStockStatus } from "@/lib/cart-utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const addItem = useCartStore((state) => state.addItem);
  
  const primaryVariant = product.variants?.[0];
  const primaryImage = product.images?.[0]?.url || "/placeholder-product.png";
  
  const sellingPrice = primaryVariant ? calculateSellingPrice(primaryVariant) : 0;
  const discountPercent = primaryVariant ? calculateDiscountPercentage(primaryVariant) : 0;
  const stockStatus = primaryVariant ? getStockStatus(primaryVariant) : { 
    inStock: false, 
    stockLevel: "out", 
    message: "Out of Stock" 
  };
  
  const hasDiscount = discountPercent > 0;
  const savings = primaryVariant ? primaryVariant.mrpPrice - sellingPrice : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!primaryVariant || !stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    startTransition(() => {
      addItem(product, primaryVariant, 1);
      
      toast.success(
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
            <Image src={primaryImage} alt={product.enName} fill className="object-contain" />
          </div>
          <div>
            <p className="font-semibold">{product.enName}</p>
            <p className="text-sm text-green-600">Added to cart</p>
          </div>
        </div>,
        {
          duration: 2000,
          position: "bottom-right",
          style: {
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          },
        }
      );
    });
  };
  
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.uid}`} className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={primaryImage}
          alt={product.enName}
          fill
          className={`object-contain p-4 transition-all duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={priority}
        />
        
        {hasDiscount && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2.5 py-1 shadow-lg">
            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-bold text-white">
              {discountPercent}% OFF
            </span>
          </div>
        )}
        
        {!stockStatus.inStock && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 shadow-lg">
            <span className="text-xs font-bold text-white">Out of Stock</span>
          </div>
        )}
        
        <button
          className={`absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.info("Added to wishlist");
          }}
        >
          <svg className="h-4 w-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105 active:scale-95"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Open quick view modal
              
            }}
          >
            Quick View
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            Walton
          </span>
          {stockStatus.inStock && stockStatus.stockLevel === "low" && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {stockStatus.message}
            </span>
          )}
        </div>
        
        <Link href={`/product/${product.uid}`} className="block">
          <h3 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 transition-colors hover:text-blue-600">
            {product.enName}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${
                  i < 4 ? "text-yellow-400" : "text-gray-300"
                } fill-current`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">(128 reviews)</span>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ৳{sellingPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ৳{primaryVariant?.mrpPrice.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  Save ৳{savings.toLocaleString()}
                </span>
              </>
            )}
          </div>
          
          
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!stockStatus.inStock || isPending}
            className="flex-1 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 py-2.5 text-sm font-bold text-white transition-all hover:from-gray-800 hover:to-gray-900 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={!stockStatus.inStock || isPending}
            className="rounded-xl border-2 border-gray-200 bg-white p-2.5 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50"
            aria-label="Quick add"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M18 13l1.5 6M9 21h6M12 18v3" />
            </svg>
          </button>
        </div>
        
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-600">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Free Shipping</span>
        </div>
      </div>
      
      <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`} />
    </div>
  );
}