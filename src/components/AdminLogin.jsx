import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; //Anexado para poder ingresar a las pantallas del admin

const AdminLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); //Anexado para poder ingresar a las pantallas del admin

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Logo */}
        {/*<div style={styles.logoWrapper}>
          <div style={styles.logo}>
            ST
          </div>
        </div>*/}
        
        <div style={styles.logoWrapper}>
          <div style={styles.logo}>
            <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }} />
          </div>
        </div>

        {/* Título */}
        <h2 className="modal-title">
          Shop<span>TRENDY</span> <span style={styles.titleAccent}>Admin</span>
        </h2>
        <p className="modal-subtitle">Panel de Administración</p>

        {/* Formulario */}
        <form className="modal-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="admin@shoptrendy.com" className="form-input" />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" className="form-input" />
          </div>

          <button 
            type="button" 
            className="btn-primary-full"
            onClick={() => { onClose(); navigate('/admin/dashboard'); }}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Credenciales de demostración */}
        {/*<div style={styles.demoBox}>
          <p style={styles.demoTitle}>Credenciales de demostración:</p>
          <p style={styles.demoText}>admin@shoptrendy.com</p>
          <p style={styles.demoText}>admin123</p>
        </div>*/}

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
  /*demoBox: {
    marginTop: '16px',
    width: '100%',
    background: '#fffbea',
    border: '1px solid #f5e4a0',
    borderRadius: '10px',
    padding: '14px 20px',
    textAlign: 'center',
  },
  demoTitle: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 6px',
  },
  demoText: {
    fontSize: '13px',
    color: '#c99a00',
    fontWeight: '600',
    margin: '2px 0',
    fontFamily: 'monospace',
  },*/
};

export default AdminLogin;