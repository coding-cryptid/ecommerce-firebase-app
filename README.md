# FakeStore Cart App — Firebase Edition

A React + TypeScript e-commerce application originally built on the FakeStore API, migrated to a full Firebase backend. Users can register and log in, browse and manage products, build a cart, place orders, and view their order history — all backed by Firebase Authentication and Firestore.

## Vercel URL

https://ecommerce-firebase-app.vercel.app/

## Features

### Authentication
- **Register** — Create an account with email/password via Firebase Authentication. A matching user profile document is created in Firestore at the same time.
- **Login / Logout** — Authenticate with email/password. Login state persists across page refreshes using Firebase's auth state listener.

### User Management
- **Profile Page** — View your account details, edit your name and address, or permanently delete your account (removes both the Firestore profile and the Firebase Auth account).

### Product Management
- **Product Catalog** — All products are stored and fetched from a Firestore `products` collection (migrated off the FakeStore API).
- **Category Filtering** — A dropdown derived dynamically from the categories present in your product data.
- **Manage Products** — A dedicated page where any logged-in user can create new products, edit existing ones, or delete them.
- **Broken Image Fallback** — Product images that fail to load automatically fall back to a placeholder image.

### Shopping Cart
- **Add to Cart** — Add products directly from the product listing.
- **Cart Page** — View, update quantities, and remove items.
- **Persistent Cart** — Cart contents are stored in `sessionStorage`, surviving page refreshes within the same browser tab.
- **Live Totals** — Total item count and total price update in real time.

### Order Management
- **Checkout** — Placing an order saves a permanent order document to Firestore containing the user's ID, the full list of items, the total price, and a timestamp — then clears the cart.
- **Order History** — Logged-in users can view a list of their past orders, showing order ID, date, and total price.
- **Order Detail View** — Clicking an order shows the full breakdown: every product purchased, quantities, and the final total.

## Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript (Vite) | Core app framework and build tool |
| Firebase Authentication | User registration, login, logout, session persistence |
| Firestore | Database for users, products, and orders |
| Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) | Global state for cart and current authenticated user |
| React Query (`@tanstack/react-query`) | Fetching and caching data from Firestore |
| React Router (`react-router-dom`) | Client-side page navigation |
| React Bootstrap + Bootstrap | UI components and responsive layout |
| sessionStorage | Cart persistence across page refreshes |

## Project Structure

```
src/
├── firebase/
│   ├── config.ts              # Firebase SDK initialization (reads from .env)
│   ├── authService.ts          # registerUser, loginUser, logoutUser, profile CRUD
│   ├── productService.ts       # Firestore CRUD for products
│   ├── orderService.ts         # createOrder, fetchUserOrders, fetchOrderById
│   └── useAuthListener.ts      # Keeps Redux auth state in sync with Firebase
├── components/
│   ├── NavBar.tsx               # Navigation, live cart count, conditional login/logout links
│   └── ProductCard.tsx          # Individual product card with Add to Cart button
├── pages/
│   ├── Home.tsx                  # Product listing + category dropdown
│   ├── Cart.tsx                   # Cart view, totals, and checkout
│   ├── Register.tsx                # Registration form
│   ├── Login.tsx                    # Login form
│   ├── Profile.tsx                   # View/edit/delete account
│   ├── ManageProducts.tsx             # Admin-style product CRUD
│   ├── OrderHistory.tsx                # List of past orders
│   └── OrderDetail.tsx                  # Full detail view for one order
├── redux/
│   ├── store.ts                          # Redux store configuration
│   ├── cartSlice.ts                       # Cart reducers (add/remove/clear), synced to sessionStorage
│   ├── authSlice.ts                        # Tracks the currently logged-in user
│   └── hooks.ts                             # Typed useAppDispatch / useAppSelector
├── types/
│   ├── Product.ts, CartItem.ts, UserProfile.ts, Order.ts
├── App.tsx                                    # Route definitions
└── main.tsx                                    # Entry point: Redux Provider, BrowserRouter, React Query
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/coding-cryptid/ecommerce-firebase-app.git
   cd ecommerce-firebase-app/fakestore-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your Firebase config:
   ```
   VITE_FB_API_KEY=your_api_key
   VITE_FB_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FB_PROJECT_ID=your_project_id
   VITE_FB_STORAGE_BUCKET=your_project.appspot.com
   VITE_FB_MESSAGING_SENDER_ID=your_sender_id
   VITE_FB_APP_ID=your_app_id
   ```
   > These values come from Firebase Console → Project Settings → General → Your apps.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Firebase Setup Notes

- **Authentication**: Enable the Email/Password sign-in method under Firebase Console → Authentication → Sign-in method.
- **Firestore**: Create a database (test mode is fine for development) under Firebase Console → Firestore Database. This project uses three collections:
  - `users` — one document per registered user, keyed by their Auth `uid`
  - `products` — the product catalog
  - `orders` — one document per completed checkout
- **Security Rules**: Firestore's default test mode expires after 30 days. This project uses rules requiring authentication for all reads/writes:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

## How Key Flows Work

- **Registration** creates a Firebase Auth account and a matching Firestore `users` document in one flow. If the Firestore write fails, the Auth account is automatically rolled back to avoid orphaned accounts.
- **Login state** is tracked continuously via Firebase's `onAuthStateChanged` listener, keeping the Redux store in sync so the user stays logged in across page refreshes.
- **Checkout** writes the order to Firestore *before* clearing the cart, ensuring no order is lost if something goes wrong mid-checkout.

## Future Improvements

- Role-based access (restrict Manage Products to admin accounts only)
- Product search alongside category filtering
- Pagination for order history
- Unit tests for reducers and Firebase service functions
