// stores/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Product, Variant, CartItem, CartStore } from '@/types';
import { calculateCartTotals, calculateSellingPrice, getStockStatus } from '@/libs/cart-util';

// Helper to generate unique cart item ID
const generateCartItemId = (productUid: string, variantCode: string): string => {
  return `${productUid}-${variantCode}`;
};

// Create the store with persistence and immer for immutable updates
export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      // Initial State
      items: [],
      totalItems: 0,
      subtotal: 0,
      totalSavings: 0,
      grandTotal: 0,

      // Actions
      addItem: (product: Product, variant: Variant, quantity: number = 1) => {
        const stockStatus = getStockStatus(variant);
        if (!stockStatus.inStock) return;

        const itemId = generateCartItemId(product.uid, variant.ebsItemCode);
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(item => item.id === itemId);

        set((state) => {
          if (existingItemIndex >= 0) {
            // Update existing item
            const existingItem = state.items[existingItemIndex];
            const newQuantity = Math.min(
              existingItem.quantity + quantity,
              variant.quantity
            );
            state.items[existingItemIndex].quantity = newQuantity;
          } else {
            // Add new item
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

          // Recalculate totals
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
          
          // Recalculate totals
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
            
            // Recalculate totals
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

      getItemCount: () => {
        return get().totalItems;
      },

      getItemById: (id: string) => {
        return get().items.find(item => item.id === id);
      },
    })),
    {
      name: 'walton-cart-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        totalSavings: state.totalSavings,
        grandTotal: state.grandTotal,
      }), // what to persist
    }
  )
);