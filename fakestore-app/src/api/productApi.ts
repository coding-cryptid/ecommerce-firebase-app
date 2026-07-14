import axios from 'axios';
import type { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
};