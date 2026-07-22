import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';
import type { Product } from '../types/Product';

export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Product[];
};