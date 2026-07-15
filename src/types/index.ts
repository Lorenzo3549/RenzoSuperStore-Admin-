// User Types
export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  subcategory?: string
  stock: number
  sku: string
  images: string[]
  thumbnail: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNewArrival: boolean
  isBestSeller: boolean
  isFlashDeal: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  icon?: string
  image?: string
  description?: string
  subcategories?: ProductCategory[]
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  helpful: number
  createdAt: Date
  updatedAt: Date
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  total: number
  itemCount: number
}

// Wishlist Types
export interface WishlistItem {
  id: string
  productId: string
  product: Product
  addedAt: Date
}

// Address Types
export interface Address {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string
  email: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
export type PaymentMethod = 'stripe' | 'paypal' | 'yoco'
export type DeliveryOption = 'standard' | 'express' | 'overnight'

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  subtotal: number
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  discount?: number
  discountCode?: string
  total: number
  shippingAddress: Address
  deliveryOption: DeliveryOption
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'completed' | 'failed'
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  estimatedDelivery?: Date
}

// Payment Types
export interface PaymentMethod {
  id: string
  userId: string
  type: 'card' | 'wallet'
  provider: 'stripe' | 'paypal' | 'yoco'
  isDefault: boolean
  createdAt: Date
}

export interface PaymentIntent {
  id: string
  orderId: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'canceled'
  provider: PaymentMethod
  metadata?: Record<string, any>
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'order' | 'product' | 'account' | 'promotion' | 'system'
  title: string
  message: string
  icon?: string
  image?: string
  link?: string
  read: boolean
  createdAt: Date
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount?: number
  maxDiscount?: number
  expiryDate: Date
  usageLimit?: number
  usageCount: number
  isActive: boolean
  applicableCategories?: string[]
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
