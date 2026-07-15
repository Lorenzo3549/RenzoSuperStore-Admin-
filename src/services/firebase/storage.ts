import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

/**
 * Upload file to Firebase Storage
 */
export const uploadFile = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const fileRef = ref(storage, `${path}${Date.now()}_${file.name}`)
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)
    return downloadURL
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upload file')
  }
}

/**
 * Delete file from Firebase Storage
 */
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    const fileRef = ref(storage, fileUrl)
    await deleteObject(fileRef)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete file')
  }
}

/**
 * Upload multiple files
 */
export const uploadMultipleFiles = async (
  files: File[],
  path: string
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => uploadFile(file, path))
    return await Promise.all(uploadPromises)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upload files')
  }
}
