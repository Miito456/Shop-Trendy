import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }} />
        <div>
          <div style={styles.headerTitle}>ShopTRENDY Admin</div>
          <div style={styles.headerSub}>Panel de Administración</div>
        </div>
      </div>
      <button style={styles.logoutBtn} onClick={() => navigate('/')}>
        <LogOut size={16} />
        Cerrar Sesión
      </button>
    </header>
  );
}

const styles = {
  header: {
    background: '#ffffff',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e8e8e8',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: '16px',
    color: '#1a1a1a',
  },
  headerSub: {
    fontSize: '12px',
    color: '#888',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default AdminHeader;