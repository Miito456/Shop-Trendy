import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@shoptrendy.com' && password === 'admin123') {
      onClose();
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">Acceso de Administrador</h2>
        <p className="modal-subtitle">ShopTRENDY Panel de Administración</p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="admin@shoptrendy.com"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text" style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-primary-full">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;
