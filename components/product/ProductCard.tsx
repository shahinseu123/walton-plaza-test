"use client"
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Extracting the first variant and image for the primary display
  const primaryVariant = product.variants?.[0];
  const primaryImage = product.images?.[0]?.url || "/placeholder-product.png";
  
  // Calculate if there is a discount to show a badge
  const hasDiscount = primaryVariant?.discount && primaryVariant.discount.value > 0;


  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-lg">
      {/* Image Container */}
      <Link href={`/product/${product.uid}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={primaryImage}
          alt={product.enName}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {hasDiscount && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{primaryVariant?.discount?.value}{primaryVariant.discount.type === 'PERCENTAGE' ? '%' : ' BDT'}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-2">
        <div className="mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
          Walton
        </div>
        
        <Link href={`/product/${product.uid}`} className="flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.enName}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-black text-gray-900">
            ৳{primaryVariant?.mrpPrice?.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳{(primaryVariant?.mrpPrice + primaryVariant?.discount?.amount).toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button 
          className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 active:scale-[0.98]"
          onClick={(e) => {
            e.preventDefault();
            // We will connect this to your Zustand store later
            console.log("Added to cart:", product.uid);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}