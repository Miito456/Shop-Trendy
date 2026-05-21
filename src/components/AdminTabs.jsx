import React from 'react';
import { LayoutDashboard, Package, ClipboardList, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/admin/dashboard' },
  { id: 'productos', label: 'Productos', icon: <Package size={16} />, path: '/admin/productos' },
  { id: 'pedidos', label: 'Pedidos', icon: <ClipboardList size={16} />, path: '/admin/pedidos' },
  { id: 'usuarios', label: 'Usuarios', icon: <Users size={16} />, path: '/admin/usuarios' },
];

function AdminTabs({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div style={styles.tabsWrapper}>
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.id ? styles.tabBtnActive : {}),
            }}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  tabsWrapper: {
    background: '#ffffff',
    padding: '16px 32px 0',
    borderBottom: '1px solid #e8e8e8',
    /*position: 'sticky',
    top: 73,
    zIndex: 99,*/
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    background: '#f5f5f5',
    padding: '6px',
    borderRadius: '12px',
    width: 'fit-content',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tabBtnActive: {
    background: '#111111',
    color: '#ffffff',
  },
};

export default AdminTabs;