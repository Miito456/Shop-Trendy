import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, ChevronLeft } from 'lucide-react';

const Header = ({ cartCount, onUserIconClick, onCartClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== '/';

  return (
    <header className="header light-header">
      <div className="header-left">
        {showBack && (
          <button className="icon-btn-minimal" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
        )}
        <Link to="/" className="brand-link-light">
          <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
            // Fallback just in case logo.png is not placed yet
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }} />
          <div className="logo-circle-fallback-light" style={{ display: 'none' }}>ST</div>
          <span className="brand-text-light">ShopTRENDY</span>
        </Link>
      </div>

      <nav className="header-nav-light">
        <Link to="/" className="nav-link-light">Inicio</Link>
        <Link to="/shop" className="nav-link-light">Catálogo</Link>
        <Link to="/about" className="nav-link-light">Nosotros</Link>
      </nav>
      
      <div className="header-right">
        <button className="icon-btn-minimal" aria-label="Mi Perfil" onClick={onUserIconClick}>
          <User size={22} strokeWidth={1.5} />
        </button>
        <button className="icon-btn-minimal cart-btn-light" aria-label="Shopping cart" onClick={onCartClick}>
          <ShoppingBag size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="cart-badge-light">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
