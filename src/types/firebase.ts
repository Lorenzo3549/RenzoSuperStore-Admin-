// Firebase Firestore Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  REVIEWS: 'reviews',
  ORDERS: 'orders',
  CARTS: 'carts',
  WISHLISTS: 'wishlists',
  ADDRESSES: 'addresses',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  COUPONS: 'coupons',
  SETTINGS: 'settings',
} as const

// Firestore Document Paths
export const PATHS = {
  USER_PROFILE: (uid: string) => `${COLLECTIONS.USERS}/${uid}`,
  USER_ORDERS: (uid: string) => `${COLLECTIONS.USERS}/${uid}/orders`,
  USER_ADDRESSES: (uid: string) => `${COLLECTIONS.USERS}/${uid}/addresses`,
  USER_PAYMENTS: (uid: string) => `${COLLECTIONS.USERS}/${uid}/payments`,
  USER_NOTIFICATIONS: (uid: string) => `${COLLECTIONS.USERS}/${uid}/notifications`,
  PRODUCT_DETAILS: (productId: string) => `${COLLECTIONS.PRODUCTS}/${productId}`,
  PRODUCT_REVIEWS: (productId: string) => `${COLLECTIONS.PRODUCTS}/${productId}/reviews`,
  ORDER_DETAILS: (orderId: string) => `${COLLECTIONS.ORDERS}/${orderId}`,
} as const

// Firebase Storage Paths
export const STORAGE_PATHS = {
  PRODUCT_IMAGES: 'products/',
  USER_AVATARS: 'users/avatars/',
  REVIEW_IMAGES: 'reviews/',
  INVOICES: 'invoices/',
} as const
