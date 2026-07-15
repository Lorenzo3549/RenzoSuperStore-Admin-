import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { auth, db } from './config'
import { Order, OrderItem } from '@types/index'

/**
 * Create a new order
 */
export const createOrder = async (
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Order> => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error('User not authenticated')

    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const newOrderDoc = await getDoc(docRef)
    return { ...newOrderDoc.data(), id: newOrderDoc.id } as Order
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create order')
  }
}

/**
 * Get user's orders
 */
export const getUserOrders = async (): Promise<Order[]> => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error('User not authenticated')

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    } as Order))
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch orders')
  }
}

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docSnapshot = await getDoc(doc(db, 'orders', orderId))
    if (!docSnapshot.exists()) return null
    return { ...docSnapshot.data(), id: docSnapshot.id } as Order
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch order')
  }
}

/**
 * Update order status
 */
export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date(),
    })
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update order status')
  }
}

/**
 * Update product stock after order
 */
export const updateProductStock = async (
  items: OrderItem[]
): Promise<void> => {
  try {
    const batch = writeBatch(db)

    for (const item of items) {
      const productRef = doc(db, 'products', item.productId)
      const productDoc = await getDoc(productRef)

      if (productDoc.exists()) {
        const currentStock = productDoc.data().stock || 0
        batch.update(productRef, {
          stock: currentStock - item.quantity,
        })
      }
    }

    await batch.commit()
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update product stock')
  }
}
