import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      // Autenticar con Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError('Credenciales incorrectas');
        setLoading(false);
        return;
      }

      // Verificar que sea admin en tu tabla users
      const res = await fetch(`http://localhost:3001/api/users/${data.user.id}`);
      const perfil = await res.json();

      if (perfil.rol !== 'admin') {
        setError('No tienes permisos de administrador');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // Es admin — navegar al dashboard
      onClose();
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Error en login admin:', err);
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>

        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={styles.logoWrapper}>
          <div style={styles.logo}>
            <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }} />
            <span style={{ display: 'none' }}>ST</span>
          </div>
        </div>

        <h2 className="modal-title">
          Shop<span>TRENDY</span> <span style={styles.titleAccent}>Admin</span>
        </h2>
        <p className="modal-subtitle">Panel de Administración</p>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <div className="modal-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="admin@shoptrendy.com"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            type="button"
            className="btn-primary-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  logoWrapper: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#111',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '20px',
  },
  titleAccent: {
    color: '#e08c00',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '13px',
    marginBottom: '12px',
    textAlign: 'center',
  },
};

export default AdminLogin;