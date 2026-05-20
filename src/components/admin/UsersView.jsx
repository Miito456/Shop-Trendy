import React, { useState } from 'react';
import { Users, Search, Filter, Eye, UserX, ShoppingBag, Mail } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';

const initialUsers = [
  { 
    id: 1, 
    initials: 'AG',
    name: 'Ana García', 
    email: 'ana.garcia@email.com',
    phone: '+34 612 345 678',
    registrationDate: '2025-12-15',
    address: 'Calle Principal 123, Madrid, España',
    totalOrders: 8,
    totalSpent: 1249.99,
    status: 'Activo'
  },
  { 
    id: 2, 
    initials: 'CR',
    name: 'Carlos Ruiz', 
    email: 'carlos.ruiz@email.com',
    phone: '+34 622 111 222',
    registrationDate: '2026-01-10',
    address: 'Avenida Libertad 45, Barcelona, España',
    totalOrders: 3,
    totalSpent: 389.97,
    status: 'Activo'
  },
  { 
    id: 3, 
    initials: 'ML',
    name: 'María López', 
    email: 'maria.lopez@email.com',
    phone: '+34 633 444 555',
    registrationDate: '2025-11-20',
    address: 'Plaza Mayor 8, Valencia, España',
    totalOrders: 12,
    totalSpent: 2150.88,
    status: 'Activo'
  },
  { 
    id: 4, 
    initials: 'JP',
    name: 'Juan Pérez', 
    email: 'juan.perez@email.com',
    phone: '+34 644 777 888',
    registrationDate: '2026-02-05',
    address: 'Calle Sol 12, Sevilla, España',
    totalOrders: 5,
    totalSpent: 679.95,
    status: 'Activo'
  },
  { 
    id: 5, 
    initials: 'LM',
    name: 'Laura Martínez', 
    email: 'laura.martinez@email.com',
    phone: '+34 655 999 000',
    registrationDate: '2025-10-30',
    address: 'Gran Vía 100, Bilbao, España',
    totalOrders: 15,
    totalSpent: 3299.85,
    status: 'Activo'
  },
  { 
    id: 6, 
    initials: 'DS',
    name: 'David Sánchez', 
    email: 'david.sanchez@email.com',
    phone: '+34 666 222 333',
    registrationDate: '2026-03-12',
    address: 'Paseo de la Castellana 20, Madrid, España',
    totalOrders: 2,
    totalSpent: 259.98,
    status: 'Activo'
  }
];

const UsersView = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeactivate = (userId) => {
    if(window.confirm('¿Estás seguro de desactivar este usuario?')) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'Inactivo' } : u));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="admin-products-view">
      <div className="products-view-header">
        <div className="header-left">
          <Users className="section-icon-large orange" size={28} />
          <div>
            <h2>Gestión de Usuarios</h2>
            <p>Administra los usuarios registrados en la plataforma</p>
          </div>
        </div>
      </div>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Todos">Todos los usuarios</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="orders-list-detailed">
        {filteredUsers.map(user => (
          <div key={user.id} className="order-card user-card">
            <div className="user-avatar orange-bg">
              {user.initials}
            </div>
            <div className="oc-info-col flex-2">
              <div className="oc-id-status">
                <span className="oc-customer-name-large">{user.name}</span>
                <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
              </div>
              <p className="oc-customer-email"><Mail size={12} className="inline-icon"/> {user.email}</p>
              <p className="oc-customer-date">Miembro desde {user.registrationDate}</p>
            </div>
            <div className="oc-date-col flex-1 text-center">
              <span className="oc-label">Pedidos</span>
              <span className="oc-value-bold"><ShoppingBag size={14} className="inline-icon orange-icon"/> {user.totalOrders}</span>
            </div>
            <div className="oc-total-col flex-1 text-center">
              <span className="oc-label">Total Gastado</span>
              <span className="oc-value-total gold-text">${user.totalSpent.toFixed(2)}</span>
            </div>
            <div className="oc-actions-col-stacked">
              <button className="btn-view-details" onClick={() => handleOpenDetails(user)}>
                <Eye size={16} /> Ver Detalles
              </button>
              {user.status === 'Activo' && (
                <button className="btn-deactivate-user" onClick={() => handleDeactivate(user.id)}>
                  <UserX size={16} /> Desactivar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <UserDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onDeactivate={handleDeactivate}
      />
    </div>
  );
};

export default UsersView;
