// stores/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Product, Variant, CartItem, CartStore } from '@/types';
import { calculateCartTotals, calculateSellingPrice, getStockStatus } from '@/lib/cart-utils';

const generateCartItemId = (productUid: string, variantCode: string): string => {
  return `${productUid}-${variantCode}`;
};

// React 19: Using Promise for async cart operations
export const fetchUserCart = async (userId?: string): Promise<CartItem[]> => {
  // Simulate API call to fetch saved cart from server
  const stored = localStorage.getItem('walton-cart-storage');
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.state?.items || [];
  }
  return [];
};

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      totalSavings: 0,
      grandTotal: 0,

      addItem: (product: Product, variant: Variant, quantity: number = 1) => {
        const stockStatus = getStockStatus(variant);
        if (!stockStatus.inStock) return;

        const itemId = generateCartItemId(product.uid, variant.ebsItemCode);
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(item => item.id === itemId);

        set((state) => {
          if (existingItemIndex >= 0) {
            const existingItem = state.items[existingItemIndex];
            const newQuantity = Math.min(
              existingItem.quantity + quantity,
              variant.quantity
            );
            state.items[existingItemIndex].quantity = newQuantity;
          } else {
            const newItem: CartItem = {
              id: itemId,
              productUid: product.uid,
              productName: product.enName,
              variant: variant,
              quantity: Math.min(quantity, variant.quantity),
              image: product.images?.[0]?.url || '/placeholder.png',
            };
            state.items.push(newItem);
          }

          const totals = calculateCartTotals(state.items);
          state.totalItems = totals.totalItems;
          state.subtotal = totals.subtotal;
          state.totalSavings = totals.totalSavings;
          state.grandTotal = totals.grandTotal;
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          state.items = state.items.filter(item => item.id !== id);
          const totals = calculateCartTotals(state.items);
          state.totalItems = totals.totalItems;
          state.subtotal = totals.subtotal;
          state.totalSavings = totals.totalSavings;
          state.grandTotal = totals.grandTotal;
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        const item = get().items.find(i => i.id === id);
        if (!item) return;

        const maxStock = item.variant.quantity;
        const newQuantity = Math.min(Math.max(1, quantity), maxStock);

        set((state) => {
          const itemIndex = state.items.findIndex(i => i.id === id);
          if (itemIndex >= 0) {
            state.items[itemIndex].quantity = newQuantity;
            const totals = calculateCartTotals(state.items);
            state.totalItems = totals.totalItems;
            state.subtotal = totals.subtotal;
            state.totalSavings = totals.totalSavings;
            state.grandTotal = totals.grandTotal;
          }
        });
      },

      clearCart: () => {
        set((state) => {
          state.items = [];
          state.totalItems = 0;
          state.subtotal = 0;
          state.totalSavings = 0;
          state.grandTotal = 0;
        });
      },

      getItemCount: () => get().totalItems,
      getItemById: (id: string) => get().items.find(item => item.id === id),
    })),
    {
      name: 'walton-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        totalSavings: state.totalSavings,
        grandTotal: state.grandTotal,
      }),
    }
  )
);