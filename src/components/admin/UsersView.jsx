import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Eye, UserX, CheckCircle, ShoppingBag, Mail } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';

<<<<<<< HEAD
const initialUsers = [
  
];
=======
const API_BASE_URL = 'http://localhost:3001/api';
>>>>>>> main

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar usuarios desde el backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error('Error al cargar usuarios');
        
        const data = await response.json();
        
        // Procesar datos para agregar iniciales
        const processedUsers = data.map(user => ({
          ...user,
          initials: user.name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2),
          registration_date: user.registration_date ? new Date(user.registration_date).toLocaleDateString('es-ES') : 'N/A',
          total_orders: user.total_orders || 0,
          total_spent: user.total_spent || 0
        }));
        
        setUsers(processedUsers);
        setError(null);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        setError('No se pudieron cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Error al actualizar status');

      const updatedUser = await response.json();

      // Actualizar el usuario en la lista
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: updatedUser.status } : u));

      // Actualizar el usuario en el modal si está abierto
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, status: updatedUser.status });
      }

      return true;
    } catch (err) {
      console.error('Error al actualizar status:', err);
      alert('Error al actualizar el estado del usuario');
      return false;
    }
  };

  const handleDeactivate = async (userId) => {
    if(window.confirm('¿Estás seguro de desactivar este usuario? No podrá iniciar sesión.')) {
      const success = await handleUpdateStatus(userId, 'Inactivo');
      if (success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleActivate = async (userId) => {
    if(window.confirm('¿Estás seguro de activar este usuario?')) {
      await handleUpdateStatus(userId, 'Activo');
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

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Cargando usuarios...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && (
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
                <p className="oc-customer-date">Miembro desde {user.registration_date}</p>
              </div>
              <div className="oc-date-col flex-1 text-center">
                <span className="oc-label">Pedidos</span>
                <span className="oc-value-bold"><ShoppingBag size={14} className="inline-icon orange-icon"/> {user.total_orders}</span>
              </div>
              <div className="oc-total-col flex-1 text-center">
                <span className="oc-label">Total Gastado</span>
                <span className="oc-value-total gold-text">${user.total_spent.toFixed(2)}</span>
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
                {user.status === 'Inactivo' && (
                  <button className="btn-activate-user" onClick={() => handleActivate(user.id)} style={{ backgroundColor: '#10b981', color: 'white' }}>
                    <CheckCircle size={16} /> Activar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <UserDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onDeactivate={handleDeactivate}
        onActivate={handleActivate}
      />
    </div>
  );
};

export default UsersView;
