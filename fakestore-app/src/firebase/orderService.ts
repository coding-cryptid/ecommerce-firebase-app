import { collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { db } from './config';
import type { CartItem } from '../types/CartItem';
import type { Order } from '../types/Order';

export const createOrder = async (
  userId: string,
  items: CartItem[],
  totalPrice: number
): Promise<void> => {
  await addDoc(collection(db, 'orders'), {
    userId,
    items,
    totalPrice,
    createdAt: new Date().toISOString(),
  });
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Order[];
};

export const fetchOrderById = async (orderId: string): Promise<Order> => {
  const orderDoc = await getDoc(doc(db, 'orders', orderId));
  if (!orderDoc.exists()) {
    throw new Error('Order not found.');
  }
  return { id: orderDoc.id, ...orderDoc.data() } as Order;
};