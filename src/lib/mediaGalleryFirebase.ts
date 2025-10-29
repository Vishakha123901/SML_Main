import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface MediaItem {
  id: string;
  type: 'image';
  url: string;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MEDIA_COLLECTION = "gallery";

export const addMediaItem = async (mediaItem: Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(collection(db, MEDIA_COLLECTION), {
    ...mediaItem,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
};

export const getMediaItems = (callback: (items: MediaItem[]) => void, errorCallback: (error: string) => void) => {
  const mediaCollection = collection(db, MEDIA_COLLECTION);
  const unsubscribe = onSnapshot(mediaCollection, (snapshot) => {
    const loadedItems: MediaItem[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as MediaItem[];
    
    // Sort by creation date (newest first)
    loadedItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    callback(loadedItems);
  }, (error) => {
    console.error("Error fetching media items from Firestore:", error);
    errorCallback("Failed to load media items. Please check your Firebase connection and rules.");
  });
  return unsubscribe;
};

export const updateMediaItem = async (id: string, mediaItem: Partial<MediaItem>) => {
  const mediaRef = doc(db, MEDIA_COLLECTION, id);
  await updateDoc(mediaRef, {
    ...mediaItem,
    updatedAt: new Date()
  });
};

export const deleteMediaItem = async (id: string) => {
  const mediaRef = doc(db, MEDIA_COLLECTION, id);
  await deleteDoc(mediaRef);
};