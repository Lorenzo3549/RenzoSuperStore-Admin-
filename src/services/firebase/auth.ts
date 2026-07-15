import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  confirmPasswordReset,
  setPersistence,
  browserLocalPersistence,
  Auth,
  UserCredential,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'
import { User } from '@types/index'

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface LoginData {
  email: string
  password: string
}

// Set persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting persistence:', error)
})

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )

    const { user } = userCredential

    // Create user document in Firestore
    const userData: User = {
      uid: user.uid,
      email: user.email || '',
      firstName: data.firstName,
      lastName: data.lastName,
      emailVerified: user.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, 'users', user.uid), userData)

    // Send email verification
    await sendEmailVerification(user)

    return userData
  } catch (error: any) {
    throw new Error(error.message || 'Failed to register user')
  }
}

/**
 * Login user
 */
export const loginUser = async (data: LoginData): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )

    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    return userDoc.data() as User
  } catch (error: any) {
    throw new Error(error.message || 'Failed to login')
  }
}

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to logout')
  }
}

/**
 * Send password reset email
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send reset email')
  }
}

/**
 * Confirm password reset
 */
export const resetPassword = async (
  code: string,
  newPassword: string
): Promise<void> => {
  try {
    await confirmPasswordReset(auth, code, newPassword)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to reset password')
  }
}

/**
 * Send email verification
 */
export const sendEmailVerificationEmail = async (): Promise<void> => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('No user logged in')
    await sendEmailVerification(user)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send verification email')
  }
}

/**
 * Get current user from Firestore
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (!auth.currentUser) return null

    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    return userDoc.exists() ? (userDoc.data() as User) : null
  } catch (error: any) {
    console.error('Error getting current user:', error)
    return null
  }
}
