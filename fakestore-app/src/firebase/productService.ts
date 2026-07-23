import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';
import type { Product } from '../types/Product';

export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Product[];
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (
  id: string,
  updates: Partial<Omit<Product, 'id'>>
): Promise<void> => {
  await updateDoc(doc(db, 'products', id), updates);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};