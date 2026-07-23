import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import NavBar from './components/NavBar.tsx';
import { useAuthListener } from './firebase/useAuthListener';
import Profile from './pages/Profile.tsx';
import ManageProducts from './pages/ManageProducts.tsx';

function App() {
  useAuthListener();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;