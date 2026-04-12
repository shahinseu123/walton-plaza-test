"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem } from "@/types";
import { calculateSellingPrice } from "@/lib/cart-utils";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const sellingPrice = calculateSellingPrice(item.variant);
  const itemTotal = sellingPrice * item.quantity;
  const originalTotal = item.variant.mrpPrice * item.quantity;
  const savings = originalTotal - itemTotal;
  const maxStock = item.variant.quantity;

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (item.quantity < maxStock) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="p-6 border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
        <div className="md:col-span-6">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.productUid}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
              >
                {item.productName}
              </Link>
              
              <p className="mt-1 text-sm text-gray-500">
                SKU: {item.variant.posItemCode}
              </p>
              
              {savings > 0 && (
                <p className="mt-1 text-xs text-green-600">
                  Save ৳{savings.toLocaleString()}
                </p>
              )}
              
              <button
                onClick={handleRemove}
                className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="text-center">
            <span className="font-semibold text-gray-900">
              ৳{sellingPrice.toLocaleString()}
            </span>
            {item.variant.discount && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                ৳{item.variant.mrpPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className="px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-12 text-center font-medium">
                {item.quantity}
              </span>
              
              <button
                onClick={handleIncrement}
                disabled={item.quantity >= maxStock}
                className="px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {item.quantity >= maxStock && (
            <p className="text-xs text-orange-600 text-center mt-1">
              Max stock reached
            </p>
          )}
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="text-right">
            <span className="font-bold text-gray-900">
              ৳{itemTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}