# Advanced React E-Commerce Web App
A React + TypeScript e-commerce shopping cart application built with the [FakeStore API](https://fakestoreapi.com/). Users can browse products, filter by category, add items to a cart, and simulate a checkout — all backed by Redux Toolkit for state management and persisted with sessionStorage.
 
## Features
 
- **Product Listing** — Fetches and displays all products from the FakeStore API using React Query, including title, price, category, description, rating, and image.
- **Broken Image Fallback** — Product images that fail to load (a known FakeStore API issue) automatically fall back to a placeholder image so the UI stays consistent.
- **Category Filtering** — A dropdown dynamically populated from the API's categories endpoint. Selecting a category fetches and displays only products from that category.
- **Shopping Cart** — Add products to your cart directly from the product listing. View, update, and remove items from a dedicated Cart page.
- **Persistent Cart** — Cart contents are stored in `sessionStorage`, so your cart survives a page refresh (cleared when the browser tab is closed).
- **Live Totals** — The cart displays the total number of items and total price, updating in real time as items are added or removed.
- **Simulated Checkout** — Clears the cart (both Redux state and sessionStorage) and shows a success confirmation, since FakeStore API doesn't support real order processing.
- **Client-Side Routing** — Navigate between the Shop and Cart pages instantly using React Router, with a live cart item count shown in the navbar.
## Tech Stack
 
| Technology | Purpose |
|---|---|
| React + TypeScript (Vite) | Core app framework and build tool |
| React Query (`@tanstack/react-query`) | Fetching and caching data from the FakeStore API |
| Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) | Global cart state management |
| React Router (`react-router-dom`) | Client-side page navigation |
| React Bootstrap + Bootstrap | UI components and responsive layout |
| Axios | HTTP requests to the FakeStore API |
| sessionStorage | Cart persistence across page refreshes |
 
## Project Structure
 
```
src/
├── api/
│   └── productApi.ts        # Axios calls: fetchProducts, fetchCategories, fetchProductsByCategory
├── components/
│   ├── NavBar.tsx            # Top navigation with live cart count
│   └── ProductCard.tsx       # Individual product card with Add to Cart button
├── pages/
│   ├── Home.tsx               # Product listing + category dropdown
│   └── Cart.tsx                # Cart view, totals, and checkout
├── redux/
│   ├── store.ts                # Redux store configuration
│   ├── cartSlice.ts            # Cart reducers: addToCart, removeFromCart, clearCart
│   └── hooks.ts                # Typed useAppDispatch / useAppSelector
├── types/
│   ├── Product.ts               # TypeScript interface for a FakeStore product
│   └── CartItem.ts              # Product + quantity
├── App.tsx                       # Route definitions
└── main.tsx                      # App entry point: QueryClientProvider, Redux Provider, BrowserRouter
```
 
## Getting Started
 
### Prerequisites
 
- Node.js (v18 or higher recommended)
- npm
### Installation
 
1. Clone the repository:
```bash
   git clone https://github.com/coding-cryptid/ecommerce-web-app.git
   cd ecommerce-web-app/fakestore-app
```
 
2. Install dependencies:
```bash
   npm install
```
 
3. Start the development server:
```bash
   npm run dev
```
 
4. Open your browser to `http://localhost:5173`
## API Reference
 
This project consumes the following [FakeStore API](https://fakestoreapi.com/) endpoints:
 
| Endpoint | Purpose |
|---|---|
| `GET /products` | Fetch all products |
| `GET /products/categories` | Fetch the list of available categories |
| `GET /products/category/{category}` | Fetch products within a specific category |
 
> **Note:** Some FakeStore API image URLs occasionally return 404 errors (an API-side issue). This app handles that gracefully with an `onError` fallback that swaps in a placeholder image.
 
## How the Cart Works
 
- Clicking **Add to Cart** dispatches an action to a Redux slice, which either adds a new item or increments the quantity of an existing one.
- Every cart change (add, remove, or checkout) automatically syncs to `sessionStorage`, so the cart is restored on refresh without any extra setup per component.
- The **Checkout** button clears both Redux state and sessionStorage, then shows a temporary success message confirming the order was "placed."
## Future Improvements
 
- Product detail pages with full descriptions
- Quantity adjustment directly from the cart (increment/decrement instead of add/remove only)
- Search functionality alongside category filtering
- Unit tests for reducers and components
