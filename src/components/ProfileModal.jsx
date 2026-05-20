import React, { useState } from 'react';
import { X, User, Package, MapPin, LogOut } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('perfil');

  if (!isOpen || !user) return null;

  const mockOrders = [
    { id: '1001', date: '19 de febrero de 2026', items: 3, total: '249.98', status: 'Entregado' },
    { id: '1002', date: '24 de febrero de 2026', items: 1, total: '129.99', status: 'En camino' },
    { id: '1003', date: '26 de febrero de 2026', items: 2, total: '89.99', status: 'Procesando' }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Entregado': return 'badge-success';
      case 'En camino': return 'badge-info';
      case 'Procesando': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title text-left">Mi Perfil</h2>
        <p className="modal-subtitle text-left">Administra tu información personal y revisa tus pedidos</p>

        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.substring(0, 2).toUpperCase() : 'UD'}
          </div>
          <div className="profile-info-header">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-tabs-nav">
          <button
            className={`profile-tab-btn ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            <User size={16} /> Perfil
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pedidos')}
          >
            <Package size={16} /> Pedidos
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'direccion' ? 'active' : ''}`}
            onClick={() => setActiveTab('direccion')}
          >
            <MapPin size={16} /> Dirección
          </button>
        </div>

        <div className="profile-tab-content">
          {activeTab === 'perfil' && (
            <div className="tab-pane">
              <h4 className="tab-pane-title">Información Personal</h4>
              <p className="tab-pane-desc">Actualiza tu información personal</p>

              <form className="modal-form">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" defaultValue={user.name} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" defaultValue={user.email} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" placeholder="+1 234 567 8900" className="form-input" />
                </div>
                <button type="button" className="btn-primary-full mt-4">
                  Editar Perfil
                </button>
              </form>
            </div>
          )}

          {activeTab === 'pedidos' && (
            <div className="tab-pane">
              <h4 className="tab-pane-title">Historial de Pedidos</h4>
              <p className="tab-pane-desc">Revisa el estado de tus pedidos</p>

              <div className="orders-list">
                {mockOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-item-left">
                      <h5>Pedido #{order.id}</h5>
                      <span className="order-date">{order.date}</span>
                      <span className="order-items-count">{order.items} artículo{order.items !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="order-item-right">
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                      <span className="order-total">${order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'direccion' && (
            <div className="tab-pane">
              <h4 className="tab-pane-title">Direcciones Guardadas</h4>
              <p className="tab-pane-desc">Administra tus direcciones de envío</p>
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                Aún no tienes direcciones guardadas.
              </div>
            </div>
          )}
        </div>

        <div className="profile-footer">
          <button className="btn-logout" onClick={() => { onLogout(); onClose(); }}>
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
