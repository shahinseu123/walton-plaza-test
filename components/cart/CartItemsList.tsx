"use client";

import { useOptimistic, useTransition } from "react";
import { CartItem } from "@/types";
import { CartItemCard } from "./CartItemCard";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface CartItemsListProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartItemsList({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart 
}: CartItemsListProps) {
  const [isPending, startTransition] = useTransition();
  
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, action: { type: string; id?: string; quantity?: number }) => {
      if (action.type === 'update' && action.id && action.quantity) {
        return state.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity! }
            : item
        );
      }
      if (action.type === 'remove' && action.id) {
        return state.filter(item => item.id !== action.id);
      }
      return state;
    }
  );

  const handleUpdateQuantity = (id: string, quantity: number) => {
    startTransition(() => {
      addOptimistic({ type: 'update', id, quantity });
    });
    onUpdateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    startTransition(() => {
      addOptimistic({ type: 'remove', id });
    });
    onRemoveItem(id);
  };

  const handleClearCart = () => {
    startTransition(() => {
      optimisticItems.forEach(item => {
        addOptimistic({ type: 'remove', id: item.id });
      });
    });
    onClearCart();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="md:col-span-6">Product</div>
        <div className="md:col-span-2 text-center">Price</div>
        <div className="md:col-span-2 text-center">Quantity</div>
        <div className="md:col-span-2 text-right">Total</div>
      </div>

      <div className="divide-y divide-gray-200">
        {optimisticItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
            isPending={isPending}
          />
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <button
            onClick={handleClearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
          
          <Link
            href="/products"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}