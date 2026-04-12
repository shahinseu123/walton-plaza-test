"use client";

import { useTransition, Suspense } from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { toast } from "sonner";

function CartContent() {
  const { 
    items, 
    totalItems, 
    subtotal, 
    totalSavings, 
    grandTotal,
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCartStore();
  
  const [isPending, startTransition] = useTransition();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    startTransition(() => {
      updateQuantity(id, quantity);
      toast.success("Quantity updated");
    });
  };

  const handleRemoveItem = (id: string) => {
    startTransition(() => {
      const item = items.find(i => i.id === id);
      removeItem(id);
      toast.success(`${item?.productName} removed from cart`);
    });
  };

  const handleClearCart = () => {
    startTransition(() => {
      clearCart();
      toast.success("Cart cleared");
    });
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        <CartItemsList 
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>

      <div className="lg:col-span-4 mt-8 lg:mt-0">
        <OrderSummary 
          totalItems={totalItems}
          subtotal={subtotal}
          totalSavings={totalSavings}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-500">
            Review and manage your items before checkout
          </p>
        </div>
        
        <Suspense fallback={<CartSkeleton />}>
          <CartContent />
        </Suspense>
      </div>
    </div>
  );
}