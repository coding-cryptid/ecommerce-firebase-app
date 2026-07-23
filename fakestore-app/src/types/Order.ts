import type { CartItem } from './CartItem';

export interface Order {
  id: string;      
  userId: string;   
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
}