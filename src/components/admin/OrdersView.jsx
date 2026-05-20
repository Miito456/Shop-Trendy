import React, { useState } from 'react';
import { Package, Search, Filter, Clock, CheckCircle, Box } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';

const initialOrders = [
  { 
    id: 'ORD-2026-001', 
    customer: { name: 'Ana García', email: 'ana.garcia@email.com' },
    date: '2026-04-21', 
    total: 249.99, 
    status: 'Completado',
    shippingAddress: 'Calle Mayor 15, Madrid, España',
    products: [{ name: 'Chaqueta de Cuero', quantity: 1, price: 249.99 }]
  },
  { 
    id: 'ORD-2026-002', 
    customer: { name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com' },
    date: '2026-04-21', 
    total: 129.99, 
    status: 'Pendiente',
    shippingAddress: 'Avenida Libertad 45, Barcelona, España',
    products: [{ name: 'Vestido Elegante de Noche', quantity: 1, price: 129.99 }]
  },
  { 
    id: 'ORD-2026-003', 
    customer: { name: 'María López', email: 'maria.lopez@email.com' },
    date: '2026-04-20', 
    total: 349.99, 
    status: 'Procesando',
    shippingAddress: 'Plaza Mayor 8, Valencia, España',
    products: [{ name: 'Reloj de Pulsera Luxury', quantity: 1, price: 349.99 }]
  },
  { 
    id: 'ORD-2026-004', 
    customer: { name: 'Juan Pérez', email: 'juan.perez@email.com' },
    date: '2026-04-20', 
    total: 89.99, 
    status: 'Completado',
    shippingAddress: 'Calle Sol 12, Sevilla, España',
    products: [{ name: 'Zapatillas Deportivas', quantity: 1, price: 89.99 }]
  },
  { 
    id: 'ORD-2026-005', 
    customer: { name: 'Laura Martínez', email: 'laura.martinez@email.com' },
    date: '2026-04-19', 
    total: 199.99, 
    status: 'Procesando',
    shippingAddress: 'Gran Vía 100, Bilbao, España',
    products: [{ name: 'Bolso de Diseñador', quantity: 1, price: 199.99 }]
  },
  { 
    id: 'ORD-2026-006', 
    customer: { name: 'David Sánchez', email: 'david.sanchez@email.com' },
    date: '2026-04-18', 
    total: 179.98, 
    status: 'Completado',
    shippingAddress: 'Paseo de la Castellana 20, Madrid, España',
    products: [
      { name: 'Camisa Casual Hombre', quantity: 2, price: 49.99 },
      { name: 'Pantalón Vaquero', quantity: 1, price: 80.00 }
    ]
  }
];

const OrdersView = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setIsModalOpen(false);
  };

  const renderStatusIcon = (status) => {
    if (status === 'Completado') return <CheckCircle size={24} className="order-icon-bg green" />;
    if (status === 'Pendiente') return <Clock size={24} className="order-icon-bg orange" />;
    return <Box size={24} className="order-icon-bg blue" />; // Procesando
  };

  return (
    <div className="admin-products-view">
      <div className="products-view-header">
        <div className="header-left">
          <Package className="section-icon-large orange" size={28} />
          <div>
            <h2>Gestión de Pedidos</h2>
            <p>Administra y monitorea todos los pedidos de la tienda</p>
          </div>
        </div>
      </div>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por número de pedido, cliente o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <Filter className="filter-icon" size={18} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Todos">Todos los estados</option>
            <option value="Completado">Completado</option>
            <option value="Procesando">Procesando</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      </div>

      <div className="orders-list-detailed">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="oc-icon-col">
              {renderStatusIcon(order.status)}
            </div>
            <div className="oc-info-col flex-2">
              <div className="oc-id-status">
                <span className="oc-id">{order.id}</span>
                <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <p className="oc-customer-name">{order.customer.name}</p>
              <p className="oc-customer-email">{order.customer.email}</p>
            </div>
            <div className="oc-date-col flex-1">
              <span className="oc-label">Fecha</span>
              <span className="oc-value">{order.date}</span>
            </div>
            <div className="oc-total-col flex-1">
              <span className="oc-label">Total</span>
              <span className="oc-value-total">${order.total.toFixed(2)}</span>
            </div>
            <div className="oc-actions-col">
              <button className="btn-view-details" onClick={() => handleOpenDetails(order)}>
                <Search size={16} /> Ver Detalles
              </button>
              {order.status === 'Pendiente' && (
                <button className="btn-action-primary black" onClick={() => handleUpdateStatus(order.id, 'Procesando')}>
                  Procesar
                </button>
              )}
              {order.status === 'Procesando' && (
                <button className="btn-action-primary green" onClick={() => handleUpdateStatus(order.id, 'Completado')}>
                  Completar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default OrdersView;
