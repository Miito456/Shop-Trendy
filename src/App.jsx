import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import CartDrawer from './components/CartDrawer';
import AdminLogin from './components/AdminLogin';
import AboutUs from './pages/AboutUs';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';
import { products as initialProducts } from './data/products';
import './index.css';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
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
    setIsCartOpen(true);
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

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserIconClick = () => {
    if (user) {
      setIsProfileModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="app-container">
      {!isAdmin && (
        <Header 
          cartCount={cartItemsCount} 
          onUserIconClick={handleUserIconClick}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage cart={cart} addToCart={addToCart} products={products} />} />
        <Route path="/product/:id" element={<ProductDetailPage cart={cart} addToCart={addToCart} products={products} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProducts products={products} setProducts={setProducts} />} />
        <Route path="/admin/pedidos" element={<AdminOrders />} />
        <Route path="/admin/usuarios" element={<AdminUsers />} />
      </Routes>

      {!isAdmin && (
        <Footer onAdminClick={() => setIsAdminLoginOpen(true)} />
      )}

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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;