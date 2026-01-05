// src/firebase/storage.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadImage = async (file: File, folder: string) => {
  try {
    // File path: projects/my-image.png
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};