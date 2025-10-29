import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Import db (Firestore) instead of database
import { Product } from "@/data/products";

const PRODUCTS_COLLECTION = "products"; // Changed to collection name

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
  return docRef.id;
};

export const getProducts = (callback: (products: Product[]) => void, errorCallback: (error: string) => void) => {
  const productsCollection = collection(db, PRODUCTS_COLLECTION);
  const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
    const loadedProducts: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]; // Cast to Product[]
    callback(loadedProducts);
  }, (error) => {
    console.error("Error fetching products from Firestore:", error);
    errorCallback("Failed to load products. Please check your Firebase connection and rules.");
  });
  return unsubscribe;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(productRef, product);
};

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(productRef);
};
