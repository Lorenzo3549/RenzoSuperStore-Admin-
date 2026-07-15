import { create } from 'zustand'
import { Product } from '@types/index'

interface RecentlyViewedStore {
  items: Product[]
  addItem: (product: Product) => void
  getItems: (limit?: number) => Product[]
  clearItems: () => void
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    set((state) => {
      const filtered = state.items.filter((item) => item.id !== product.id)
      return { items: [product, ...filtered] }
    })
  },

  getItems: (limit = 10) => {
    return get().items.slice(0, limit)
  },

  clearItems: () => set({ items: [] }),
}))
