import React from 'react';
import { X } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdateStatus }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-details-modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">Detalles del Pedido</h2>
          <span className={`status-badge ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
        <p className="modal-subtitle order-id">{order.id}</p>

        <div className="details-grid">
          <div className="details-section">
            <h4>Cliente</h4>
            <p className="primary-text">{order.customer.name}</p>
            <p className="secondary-text">{order.customer.email}</p>
          </div>
          <div className="details-section">
            <h4>Fecha</h4>
            <p className="primary-text">{order.date}</p>
          </div>
        </div>

        <div className="details-section full-width border-top">
          <h4>Dirección de Envío</h4>
          <p className="primary-text">{order.shippingAddress}</p>
        </div>

        <div className="details-section full-width border-top">
          <h4>Productos</h4>
          <div className="order-products-list">
            {order.products.map((prod, idx) => (
              <div key={idx} className="order-product-row">
                <div>
                  <p className="primary-text">{prod.name}</p>
                  <p className="secondary-text">Cantidad: {prod.quantity}</p>
                </div>
                <div className="product-price">${prod.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-total-box">
          <span className="total-label">Total del Pedido</span>
          <span className="total-amount">${order.total.toFixed(2)}</span>
        </div>

        <div className="modal-actions-spaced">
          {order.status !== 'Completado' && (
            <button 
              className="btn-primary-full btn-complete-order"
              onClick={() => onUpdateStatus(order.id, 'Completado')}
            >
              Marcar como Completado
            </button>
          )}
          <button 
            className="btn-secondary-full btn-cancel"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
