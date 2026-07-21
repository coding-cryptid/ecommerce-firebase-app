import Home from './pages/Home.tsx'
import Cart from './pages/Cart.tsx'
import NavBar from './components/NavBar.tsx'
import Register from './pages/Register.tsx'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </>
    );
}

export default App
