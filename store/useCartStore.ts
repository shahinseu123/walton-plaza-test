import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  uid: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (uid: string) => void;
  updateQuantity: (uid: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.uid === newItem.uid);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.uid === newItem.uid
                ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (uid) => 
        set({ items: get().items.filter((i) => i.uid !== uid) }),

      updateQuantity: (uid, quantity) =>
        set({
          items: get().items.map((i) =>
            i.uid === uid ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => 
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'walton-cart-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);