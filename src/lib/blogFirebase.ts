import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { BlogPost } from "@/data/blog";

const BLOGS_COLLECTION = "blogs";

export const addBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'publishDate'>) => {
  const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
    ...blogPost,
    category: blogPost.category || 'Uncategorized', // Ensure category is present with a default
    publishDate: new Date().toISOString().split('T')[0], // Set current date
  });
  return docRef.id;
};

export const getBlogPosts = (callback: (blogPosts: BlogPost[]) => void, errorCallback: (error: string) => void) => {
  const blogsCollection = collection(db, BLOGS_COLLECTION);
  const q = query(blogsCollection, orderBy("publishDate", "desc")); // Order by date

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const loadedBlogPosts: BlogPost[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Ensure category has a default value if not present in old documents
      category: doc.data().category || 'Uncategorized',
    })) as BlogPost[];
    callback(loadedBlogPosts);
  }, (error) => {
    console.error("Error fetching blog posts from Firestore:", error);
    errorCallback("Failed to load blog posts. Please check your Firebase connection and rules.");
  });
  return unsubscribe;
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return { 
      id: docSnap.id, 
      ...data,
      category: data.category || 'Uncategorized' // Ensure category has a default value
    } as BlogPost;
  } else {
    return null;
  }
};

export const updateBlogPost = async (id: string, blogPost: Partial<Omit<BlogPost, 'id' | 'publishDate'>>) => {
  const blogPostRef = doc(db, BLOGS_COLLECTION, id);
  await updateDoc(blogPostRef, blogPost);
};

export const deleteBlogPost = async (id: string) => {
  const blogPostRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(blogPostRef);
};
