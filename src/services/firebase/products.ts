import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'
import { Product, ProductCategory, PaginatedResponse } from '@types/index'

/**
 * Get all products with filters
 */
export const getProducts = async (
  filters?: {
    category?: string
    search?: string
    sortBy?: 'price' | 'rating' | 'newest'
    limit?: number
  }
): Promise<Product[]> => {
  try {
    const constraints: QueryConstraint[] = []

    if (filters?.category) {
      constraints.push(where('category', '==', filters.category))
    }

    if (filters?.sortBy === 'price') {
      constraints.push(orderBy('price', 'asc'))
    } else if (filters?.sortBy === 'rating') {
      constraints.push(orderBy('rating', 'desc'))
    } else {
      constraints.push(orderBy('createdAt', 'desc'))
    }

    if (filters?.limit) {
      constraints.push(limit(filters.limit))
    }

    const q = query(collection(db, 'products'), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch products')
  }
}

/**
 * Get featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('isFeatured', '==', true),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch featured products')
  }
}

/**
 * Get new arrivals
 */
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('isNewArrival', '==', true),
      orderBy('createdAt', 'desc'),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch new arrivals')
  }
}

/**
 * Get best sellers
 */
export const getBestSellers = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('isBestSeller', '==', true),
      orderBy('rating', 'desc'),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch best sellers')
  }
}

/**
 * Get flash deals
 */
export const getFlashDeals = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('isFlashDeal', '==', true),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch flash deals')
  }
}

/**
 * Get product by ID
 */
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const docSnapshot = await getDoc(doc(db, 'products', productId))
    if (!docSnapshot.exists()) return null
    return { ...docSnapshot.data(), id: docSnapshot.id } as Product
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch product')
  }
}

/**
 * Get categories
 */
export const getCategories = async (): Promise<ProductCategory[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'))
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as ProductCategory))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch categories')
  }
}

/**
 * Search products
 */
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('name'),
      limit(20)
    )
    const querySnapshot = await getDocs(q)
    const allProducts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Product))

    // Client-side filtering for search
    const lowerSearchTerm = searchTerm.toLowerCase()
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm) ||
        product.category.toLowerCase().includes(lowerSearchTerm)
    )
  } catch (error: any) {
    throw new Error(error.message || 'Failed to search products')
  }
}
