import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';
import type { Product } from '../types/Product';

// export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
//   try {
//     const snapshot = await getDocs(collection(db, 'products'));

//     console.log("Products fetched:", snapshot.docs.length);

//     return snapshot.docs.map((docSnap) => {
//       const data = docSnap.data() as Omit<Product, 'id'>;

//       return {
//         id: Number(docSnap.id),
//         ...data,
//       };
//     });

//   } catch (error) {
//     console.error("Firestore product fetch failed:", error);
//     throw error;
//   }
// };

export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  console.log("FETCH PRODUCTS FUNCTION CALLED");

  try {
    const snapshot = await getDocs(collection(db, 'products'));

    console.log("FIRESTORE DOC COUNT:", snapshot.size);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Omit<Product, 'id'>;
      return { id: Number(docSnap.id), ...data };
    });

  } catch (error) {
    console.error("Firestore product fetch failed:", error);
    throw error;
  }
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