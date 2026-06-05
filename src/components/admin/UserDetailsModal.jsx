import React, { useState } from 'react';
import { X, Mail, Phone, Calendar, ShoppingBag, DollarSign } from 'lucide-react';

const UserDetailsModal = ({ isOpen, onClose, user, onDeactivate, onActivate }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleDeactivateClick = async () => {
    setIsLoading(true);
    if (onDeactivate) {
      await onDeactivate(user.id);
    }
    setIsLoading(false);
  };

  const handleActivateClick = async () => {
    setIsLoading(true);
    if (onActivate) {
      await onActivate(user.id);
    }
    setIsLoading(false);
  };

  // Convertir registration_date al formato correcto
  const registrationDate = user.registration_date || user.registrationDate || 'N/A';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-details-modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-header user-modal-header">
          <div className="user-avatar-large orange-bg">{user.initials}</div>
          <div className="user-header-info">
            <h2 className="modal-title">
              {user.name} 
              <span className={`status-badge ${user.status ? user.status.toLowerCase() : 'activo'}`}>
                {user.status || 'Activo'}
              </span>
            </h2>
            <p className="modal-subtitle">{user.email}</p>
          </div>
        </div>

        <div className="details-grid mt-2">
          <div className="details-section">
            <h4>Información de Contacto</h4>
            <div className="contact-info-row">
              <Mail size={14} className="icon-gold" />
              <p className="secondary-text">{user.email}</p>
            </div>
            <div className="contact-info-row">
              <Phone size={14} className="icon-blue" />
              <p className="secondary-text">{user.phone || 'No registrado'}</p>
            </div>
          </div>
          <div className="details-section">
            <h4>Dirección de Envío</h4>
            <p className="secondary-text">{user.address || 'No registrada'}</p>
          </div>
        </div>

        <div className="details-section mt-2">
          <h4>Fecha de Registro</h4>
          <div className="contact-info-row">
            <Calendar size={14} className="icon-gold" />
            <p className="secondary-text">{registrationDate}</p>
          </div>
        </div>

        <div className="user-stats-grid mt-3">
          <div className="user-stat-box">
            <p className="us-label">Total Pedidos</p>
            <div className="us-value-row">
              <span className="us-value">{user.total_orders || user.totalOrders || 0}</span>
              <div className="us-icon-circle orange-light"><ShoppingBag size={18} className="icon-orange" /></div>
            </div>
          </div>
          <div className="user-stat-box">
            <p className="us-label">Total Gastado</p>
            <div className="us-value-row">
              <span className="us-value gold">${(user.total_spent || user.totalSpent || 0).toFixed(2)}</span>
              <div className="us-icon-circle green-light"><DollarSign size={18} className="icon-green" /></div>
            </div>
          </div>
        </div>

        <div className="modal-actions-spaced mt-3">
          {user.status === 'Activo' ? (
            <button 
              className="btn-secondary-full btn-deactivate"
              onClick={handleDeactivateClick}
              disabled={isLoading}
            >
              {isLoading ? 'Desactivando...' : 'Desactivar Usuario'}
            </button>
          ) : (
            <button 
              className="btn-secondary-full btn-activate"
              onClick={handleActivateClick}
              disabled={isLoading}
              style={{ backgroundColor: '#10b981', color: 'white' }}
            >
              {isLoading ? 'Activando...' : 'Activar Usuario'}
            </button>
          )}
          <button 
            className="btn-secondary-full btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
