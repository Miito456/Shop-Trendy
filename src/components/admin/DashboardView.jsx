import React from 'react';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';

const DashboardView = () => {
  return (
    <div className="admin-dashboard-view">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Ingresos Totales</span>
            <div className="stat-icon-wrapper green">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value">$45,280.50</div>
          <div className="stat-trend positive">
            <TrendingUp size={14} /> +12.5% <span>vs mes anterior</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pedidos</span>
            <div className="stat-icon-wrapper blue">
              <ShoppingCart size={20} />
            </div>
          </div>
          <div className="stat-value">324</div>
          <div className="stat-trend positive">
            <TrendingUp size={14} /> +8.2% <span>vs mes anterior</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Productos</span>
            <div className="stat-icon-wrapper orange">
              <Package size={20} />
            </div>
          </div>
          <div className="stat-value">156</div>
          <div className="stat-trend positive">
            <TrendingUp size={14} /> +5.1% <span>vs mes anterior</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Usuarios</span>
            <div className="stat-icon-wrapper purple">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-value">1,248</div>
          <div className="stat-trend positive">
            <TrendingUp size={14} /> +15.3% <span>vs mes anterior</span>
          </div>
        </div>
      </div>
      <div className="dashboard-alert">
        <div className="alert-icon">!</div>
        <div className="alert-content">
          <h4>Productos con Stock Bajo</h4>
          <p>Hay 3 productos con menos de 5 unidades en inventario. Revisa la sección de productos para reponer stock.</p>
        </div>
      </div>
      <br />
      <br />
      <div className="dashboard-content-grid">
        <div className="dashboard-section recent-orders">
          <div className="section-header">
            <ShoppingCart className="section-icon" size={20} />
            <div>
              <h3>Pedidos Recientes</h3>
              <p>Últimos pedidos realizados</p>
            </div>
          </div>
          <div className="orders-list">
            {[
              { name: 'Ana García', date: '2026-04-21', amount: 249.99, status: 'Completado' },
              { name: 'Carlos Ruiz', date: '2026-04-21', amount: 129.99, status: 'Pendiente' },
              { name: 'María López', date: '2026-04-20', amount: 349.99, status: 'Procesando' },
              { name: 'Juan Pérez', date: '2026-04-20', amount: 89.99, status: 'Completado' },
              { name: 'Laura Martínez', date: '2026-04-19', amount: 199.99, status: 'Procesando' },
            ].map((order, idx) => (
              <div key={idx} className="order-item">
                <div className="order-info">
                  <div className="order-name">{order.name}</div>
                  <div className="order-date">{order.date}</div>
                </div>
                <div className="order-right">
                  <div className="order-amount">${order.amount}</div>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section top-products">
          <div className="section-header">
            <TrendingUp className="section-icon" size={20} />
            <div>
              <h3>Productos Más Vendidos</h3>
              <p>Top 5 productos este mes</p>
            </div>
          </div>
          <div className="top-products-list">
            {[
              { id: 1, name: 'Chaqueta de Cuero', sales: 45, revenue: 11249.55 },
              { id: 2, name: 'Reloj de Pulsera Luxury', sales: 32, revenue: 11199.68 },
              { id: 3, name: 'Vestido Elegante de Noche', sales: 38, revenue: 4939.62 },
              { id: 4, name: 'Bolso de Diseñador', sales: 28, revenue: 5599.72 },
              { id: 5, name: 'Zapatillas Deportivas', sales: 52, revenue: 4679.48 },
            ].map((prod, idx) => (
              <div key={idx} className="top-product-item">
                <div className="rank-circle">{prod.id}</div>
                <div className="top-product-info">
                  <div className="tp-name">{prod.name}</div>
                  <div className="tp-sales">{prod.sales} ventas</div>
                </div>
                <div className="tp-revenue">${prod.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default DashboardView;
