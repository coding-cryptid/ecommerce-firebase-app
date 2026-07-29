import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import ProductCard from './ProductCard';
import type { Product } from '../types/Product';

const mockProduct: Product = {
  id: 1,
  title: 'Wireless Mouse',
  price: 24.99,
  category: 'electronics',
  description: 'A comfortable wireless mouse',
  image: 'https://example.com/mouse.jpg'
};


const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};

describe('ProductCard', () => {
  it('renders the product title and price', () => {
    renderWithStore(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('$24.99')).toBeInTheDocument();
  });

  it('dispatches addToCart when the "Add to Cart" button is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={mockProduct} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].title).toBe('Wireless Mouse');
  });
});