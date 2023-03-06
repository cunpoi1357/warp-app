import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../libs/firebase'

export const uploadData = async (path: string, data: File) => {
    const fileRef = ref(storage, path)
    await uploadBytes(fileRef, data)
    return await getDownloadURL(fileRef)
}
