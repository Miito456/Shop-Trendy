import React, { useState, useEffect} from 'react';
import { X, User, Package, MapPin, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [nombre, setNombre] = useState(user?.name || '');
  const [telefono, setTelefono] = useState(user?.phone || '');
  const [direccion, setDireccion] = useState(user?.address || '');
  const [guardando, setGuardando] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

 useEffect(() => {
    if (isOpen && user) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.id) {
          fetch(`http://localhost:3001/api/users/${session.user.id}`)
            .then(res => res.json())
            .then(data => {
              setNombre(data.name || '');
              setTelefono(data.phone || '');
              setDireccion(data.address || '');
            })
            .catch(err => console.error('Error cargando perfil:', err));
        }
      });
    }
  }, [isOpen, user]);

  useEffect(() => {
  if (activeTab === 'pedidos' && isOpen) {
    setLoadingOrders(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        fetch(`http://localhost:3001/api/orders/user/${session.user.id}`)
          .then(res => res.json())
          .then(data => {
            setOrders(data);
            setLoadingOrders(false);
          })
          .catch(err => {
            console.error('Error cargando pedidos:', err);
            setLoadingOrders(false);
          });
      }
    });
  }
}, [activeTab, isOpen]);

  if (!isOpen || !user) return null;

  const handleGuardarPerfil = async () => {
    setGuardando(true);
    try {
      // Obtener el ID del usuario de Supabase
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        alert('No se pudo identificar al usuario');
        return;
      }

      await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, phone: telefono, address: direccion })
      });

      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setGuardando(false);
    }
  };

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
          <button className={`profile-tab-btn ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
            <User size={16} /> Perfil
          </button>
          <button className={`profile-tab-btn ${activeTab === 'pedidos' ? 'active' : ''}`} onClick={() => setActiveTab('pedidos')}>
            <Package size={16} /> Pedidos
          </button>
          <button className={`profile-tab-btn ${activeTab === 'direccion' ? 'active' : ''}`} onClick={() => setActiveTab('direccion')}>
            <MapPin size={16} /> Dirección
          </button>
        </div>

        <div className="profile-tab-content">
          {activeTab === 'perfil' && (
            <div className="tab-pane">
              <h4 className="tab-pane-title">Información Personal</h4>
              <p className="tab-pane-desc">Actualiza tu información personal</p>
              <div className="modal-form">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    value={user.email}
                    className="form-input"
                    disabled
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button
                  type="button"
                  className="btn-primary-full mt-4"
                  onClick={handleGuardarPerfil}
                  disabled={guardando}
                >
                  {guardando ? 'Guardando...' : 'Editar Perfil'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'pedidos' && (
  <div className="tab-pane">
    <h4 className="tab-pane-title">Historial de Pedidos</h4>
    <p className="tab-pane-desc">Revisa el estado de tus pedidos</p>

    {loadingOrders ? (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
        Cargando pedidos...
      </div>
    ) : orders.length === 0 ? (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
        No tienes pedidos aún.
      </div>
    ) : (
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-item-left">
              <h5>Pedido #{order.id}</h5>
              <span className="order-date">{order.date}</span>
              <span className="order-items-count">
                {Array.isArray(order.products) ? order.products.length : 0} artículo(s)
              </span>
            </div>
            <div className="order-item-right">
              <span className={`status-badge ${
                order.status === 'Completado' ? 'badge-success' :
                order.status === 'Procesando' ? 'badge-info' :
                order.status === 'Cancelado' ? 'badge-danger' : 'badge-warning'
              }`}>
                {order.status}
              </span>
              <span className="order-total">
                ${parseFloat(order.total).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

          {activeTab === 'direccion' && (
            <div className="tab-pane">
              <h4 className="tab-pane-title">Dirección de Envío</h4>
              <p className="tab-pane-desc">Administra tu dirección de envío</p>
              <div className="modal-form">
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    placeholder="Calle, número, ciudad..."
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button
                  type="button"
                  className="btn-primary-full mt-4"
                  onClick={handleGuardarPerfil}
                  disabled={guardando}
                >
                  {guardando ? 'Guardando...' : 'Guardar Dirección'}
                </button>
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