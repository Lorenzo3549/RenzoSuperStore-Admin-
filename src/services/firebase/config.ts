import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getMessaging, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Cloud Messaging
let messaging: any = null
try {
  messaging = getMessaging(app)
} catch (error) {
  console.warn('Firebase Messaging not available')
}

export { messaging }

// Enable Emulators in Development (optional)
if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_USE_EMULATOR === 'true') {
  try {
    if (!auth.currentUser) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    }
  } catch (error) {
    // Emulator already connected
  }

  try {
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    // Emulator already connected
  }

  try {
    connectStorageEmulator(storage, 'localhost', 9199)
  } catch (error) {
    // Emulator already connected
  }
}

export default app
