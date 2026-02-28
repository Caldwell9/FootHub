import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const addToCart = (product, size, quantity) => {
    const existingItem = cart.find((item) => item._id === product._id && item.size === size);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, size, quantity }]);
    }
  };

  const updateCart = (productId, size, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => !(item._id === productId && item.size === size)));
    } else {
      setCart(
        cart.map((item) =>
          item._id === productId && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter((item) => !(item._id === productId && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        user,
        token,
        login,
        logout,
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={token ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/admin" element={token && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </CartContext.Provider>
  );
}

export default App;