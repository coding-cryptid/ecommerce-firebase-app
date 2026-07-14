import axios from 'axios';
import type { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return response.data;
};