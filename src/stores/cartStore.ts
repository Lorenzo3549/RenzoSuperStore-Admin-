import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Cart } from '@types/index'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCart: () => Cart
}

export const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === item.productId)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }))
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getCart: () => {
        const state = get()
        const subtotal = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
        const total = subtotal * 1.1 // 10% tax
        return {
          items: state.items,
          subtotal,
          total,
          itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
        }
      },
    }),
    {
      name: 'cart-store',
    }
  )
)
