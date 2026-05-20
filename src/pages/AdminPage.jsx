import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardView from '../components/admin/DashboardView';
import ProductsView from '../components/admin/ProductsView';
import OrdersView from '../components/admin/OrdersView';
import UsersView from '../components/admin/UsersView';
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';

const AdminPage = ({ products, setProducts }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="logo-circle logo">ST</div>
          <div className="admin-header-titles">
            <h2>Shop-Trendy Admin</h2>
            <span>Panel de Administración</span>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <div className="admin-nav-container">
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveTab('productos')}
          >
            <Package size={18} /> Productos
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pedidos')}
          >
            <ShoppingCart size={18} /> Pedidos
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'usuarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('usuarios')}
          >
            <Users size={18} /> Usuarios
          </button>
        </nav>
      </div>

      <main className="admin-main-content">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'productos' && <ProductsView products={products} setProducts={setProducts} />}
        {activeTab === 'pedidos' && <OrdersView />}
        {activeTab === 'usuarios' && <UsersView />}
      </main>
    </div>
  );
};

export default AdminPage;
