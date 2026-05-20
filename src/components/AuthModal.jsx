import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login by passing dummy user data
    onLogin({
      name: 'Usuario Demo',
      email: 'usuario@gmail.com'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">Bienvenido a Shop-Trendy</h2>
        <p className="modal-subtitle">Inicia sesión o crea una cuenta para continuar</p>

        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {activeTab === 'register' && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Usuario Demo" className="form-input" required />
            </div>
          )}

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="usuario@gmail.com" className="form-input" required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" className="form-input" required />
          </div>

          {activeTab === 'register' && (
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input type="password" placeholder="••••••••" className="form-input" required />
            </div>
          )}

          <button type="submit" className="btn-primary-full">
            {activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
