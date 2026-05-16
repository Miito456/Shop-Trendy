import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import CartDrawer from './components/CartDrawer';
import './index.css';

import AdminLogin from './components/AdminLogin'; //Anexado para la ruta del administrador
import AboutUs from './pages/AboutUs'; //Anexado para la ruta de Nosotros
import AdminDashboard from './pages/AdminDashboard'; //Anexado para la ruta del dashboard del administrador

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false); //Anexado para el estado del modal de administrador

  // Cart Management
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product with same ID and size exists
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && item.size === product.size
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += (product.quantity || 1);
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1, cartId: Date.now().toString() }];
      }
    });
    setIsCartOpen(true); // Open drawer on add
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => prevCart.map(item => 
      (item.cartId === cartId || item.id === cartId) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId && item.id !== cartId));
  };

  const clearCart = () => setCart([]);

  // Calculate total items in cart (sum of quantities)
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserIconClick = () => {
    if (user) {
      setIsProfileModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <Router>
      <div className="app-container">

        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>

        <Header 
          cartCount={cartItemsCount} 
          onUserIconClick={handleUserIconClick}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage cart={cart} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage cart={cart} addToCart={addToCart} />} />
          
          <Route path="/about" element={<AboutUs />} /> {/* Anexado para la ruta de Nosotros */}
          
          {/*
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/*Anexado para la ruta del dashboard del administrador
          <Route path="/admin" element={<AdminLogin />} /> //Anexado para la ruta del administrador
          */}

        </Routes>
        
        <Footer onAdminClick={() => setIsAdminLoginOpen(true)} />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={(userData) => setUser(userData)} 
        />

        <ProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
          user={user} 
          onLogout={() => setUser(null)} 
        />

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />

        <AdminLogin
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
