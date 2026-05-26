import React, { useState } from 'react';
import { Search, Eye, UserX, Users, UserCheck, X, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, ChevronDown, Filter } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminTabs from '../components/AdminTabs';

const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana.garcia@email.com', desde: '2025-12-15', pedidos: 8, total: '$1249.99', status: 'Activo', telefono: '+34 612 345 678', direccion: 'Calle Mayor 12, Madrid, España' },
  { id: 2, nombre: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', desde: '2026-01-10', pedidos: 3, total: '$389.97', status: 'Activo', telefono: '+34 623 456 789', direccion: 'Avenida del Sol 45, Barcelona, España' },
  { id: 3, nombre: 'María López', email: 'maria.lopez@email.com', desde: '2025-11-20', pedidos: 12, total: '$2150.88', status: 'Activo', telefono: '+34 634 567 890', direccion: 'Plaza Central 8, Valencia, España' },
  { id: 4, nombre: 'Juan Pérez', email: 'juan.perez@email.com', desde: '2026-02-05', pedidos: 5, total: '$679.95', status: 'Activo', telefono: '+34 645 678 901', direccion: 'Calle Real 3, Sevilla, España' },
  { id: 5, nombre: 'Laura Martínez', email: 'laura.martinez@email.com', desde: '2025-10-30', pedidos: 15, total: '$3299.85', status: 'Activo', telefono: '+34 656 789 012', direccion: 'Avenida Norte 22, Bilbao, España' },
  { id: 6, nombre: 'David Sánchez', email: 'david.sanchez@email.com', desde: '2026-03-12', pedidos: 2, total: '$259.98', status: 'Activo', telefono: '+34 667 890 123', direccion: 'Calle Sur 7, Málaga, España' },
  { id: 7, nombre: 'Isabel Fernández', email: 'isabel.fernandez@email.com', desde: '2025-09-15', pedidos: 1, total: '$69.99', status: 'Inactivo', telefono: '+34 678 901 234', direccion: 'Plaza Mayor 1, Zaragoza, España' },
  { id: 8, nombre: 'Miguel Torres', email: 'miguel.torres@email.com', desde: '2026-01-25', pedidos: 6, total: '$899.94', status: 'Activo', telefono: '+34 689 012 345', direccion: 'Calle Oriente 15, Murcia, España' },
  { id: 9, nombre: 'Carmen Rodríguez', email: 'carmen.rodriguez@email.com', desde: '2025-12-01', pedidos: 9, total: '$1589.91', status: 'Activo', telefono: '+34 690 123 456', direccion: 'Avenida Central 30, Alicante, España' },
  { id: 10, nombre: 'Pedro Moreno', email: 'pedro.moreno@email.com', desde: '2026-02-18', pedidos: 4, total: '$549.96', status: 'Activo', telefono: '+34 601 234 567', direccion: 'Calle Poniente 9, Granada, España' },
];

function getInitials(nombre) {
  return nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todos los usuarios');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(usuarios);
  const [filtroOpen, setFiltroOpen] = useState(false);

  const filtered = users.filter(u => {
    const matchSearch = u.nombre.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === 'Todos los usuarios' || u.status === filtro.replace('s', '').replace('Activo', 'Activo').replace('Inactivo', 'Inactivo');
    return matchSearch && (filtro === 'Todos los usuarios' ? true : u.status === (filtro === 'Activos' ? 'Activo' : 'Inactivo'));
  });

  const toggleStatus = (id) => {
    const user = users.find(u => u.id === id);
    const mensaje = user.status === 'Activo' 
      ? '¿Estás seguro de que deseas Desactivar este usuario?' 
      : '¿Estás seguro de que deseas Activar este usuario?';
    
    if (!window.confirm(mensaje)) return;

    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } : u));
    if (selectedUser?.id === id) {
      setSelectedUser(prev => ({ ...prev, status: prev.status === 'Activo' ? 'Inactivo' : 'Activo' }));
    }
  };

  return (
    <div style={styles.page}>
      <AdminHeader />
      <AdminTabs activeTab="usuarios" />

      <main style={styles.content}>
        {/* Title */}
        <div style={styles.titleRow}>
          <div style={styles.titleIcon}><Users size={22} color="#e08c00" /></div>
          <div>
            <h2 style={styles.title}>Gestión de Usuarios</h2>
            <p style={styles.subtitle}>Administra los usuarios registrados en la plataforma</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ ...styles.searchBox, flex: 1 }}>
            <Search size={16} color="#aaa" />
            <input
              style={styles.searchInput}
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.filtroWrapper}>
            <button style={styles.filtroBtn} onClick={() => setFiltroOpen(!filtroOpen)}>
              <Filter size={14} /> {filtro} <ChevronDown size={14} />
            </button>
            {filtroOpen && (
              <div style={styles.filtroMenu}>
                {['Todos los usuarios', 'Activos', 'Inactivos'].map(op => (
                  <div key={op} style={styles.filtroItem} onClick={() => { setFiltro(op); setFiltroOpen(false); }}>
                    {op}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Users List */}
        <div style={styles.card}>
          {filtered.map((user, i) => (
            <div key={user.id} style={{ ...styles.userRow, borderBottom: i < filtered.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              
              {/* Avatar + Info */}
              <div style={styles.userLeft}>
                <div style={styles.avatar}>{getInitials(user.nombre)}</div>
                <div style={styles.userInfo}>
                  <div style={styles.userNameRow}>
                    <span style={styles.userName}>{user.nombre}</span>
                    <span style={{ ...styles.statusBadge, ...(user.status === 'Activo' ? styles.badgeActivo : styles.badgeInactivo) }}>
                      {user.status}
                    </span>
                  </div>
                  <div style={styles.userMeta}><Mail size={12} /> {user.email}</div>
                  <div style={styles.userMeta}><Calendar size={12} /> Miembro desde {user.desde}</div>
                </div>
              </div>

              {/* Stats */}
              <div style={styles.userStats}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Pedidos</span>
                  <div style={styles.statValueRow}><ShoppingBag size={14} color="#e08c00" /> <span style={styles.statNum}>{user.pedidos}</span></div>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Total Gastado</span>
                  <span style={styles.statMoney}>{user.total}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={styles.actions}>
                <button style={styles.btnDetalle} onClick={() => setSelectedUser(user)}>
                  <Eye size={14} /> Ver Detalles
                </button>
                <button
                  style={user.status === 'Activo' ? styles.btnDesactivar : styles.btnActivar}
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.status === 'Activo' ? <><UserX size={14} /> Desactivar</> : <><UserCheck size={14} /> Activar</>}
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* Modal Ver Detalles */}
      {selectedUser && (
        <div style={styles.overlay} onClick={() => setSelectedUser(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            
            <button style={styles.closeBtn} onClick={() => setSelectedUser(null)}>
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div style={styles.modalAvatar}>{getInitials(selectedUser.nombre)}</div>
              <div>
                <div style={styles.modalNameRow}>
                  <span style={styles.modalName}>{selectedUser.nombre}</span>
                  <span style={{ ...styles.statusBadge, ...(selectedUser.status === 'Activo' ? styles.badgeActivo : styles.badgeInactivo) }}>
                    {selectedUser.status}
                  </span>
                </div>
                <div style={styles.modalEmail}>{selectedUser.email}</div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Modal Info */}
            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <div style={styles.modalSectionTitle}>Información de Contacto</div>
                <div style={styles.modalInfoRow}><Mail size={14} color="#e08c00" /> {selectedUser.email}</div>
                <div style={styles.modalInfoRow}><Phone size={14} color="#e08c00" /> {selectedUser.telefono}</div>
                <div style={{...styles.modalSectionTitle, marginTop: '16px'}}>Fecha de Registro</div>
                <div style={styles.modalInfoRow}><Calendar size={14} color="#e08c00" /> {selectedUser.desde}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalSectionTitle}>Dirección de Envío</div>
                <div style={styles.modalInfoRow}><MapPin size={14} color="#e08c00" /> {selectedUser.direccion}</div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Stats */}
            <div style={styles.modalStats}>
              <div style={styles.modalStatCard}>
                <span style={styles.modalStatLabel}>Total Pedidos</span>
                <div style={styles.modalStatValue}>
                  <span style={styles.modalStatNum}>{selectedUser.pedidos}</span>
                  <div style={styles.modalStatIcon}><ShoppingBag size={20} color="#fff" /></div>
                </div>
              </div>
              <div style={{ ...styles.modalStatCard, background: '#f0fdf4' }}>
                <span style={styles.modalStatLabel}>Total Gastado</span>
                <div style={styles.modalStatValue}>
                  <span style={{ ...styles.modalStatNum, color: '#16a34a' }}>{selectedUser.total}</span>
                  <div style={{ ...styles.modalStatIcon, background: '#16a34a' }}><DollarSign size={20} color="#fff" /></div>
                </div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Modal Actions */}
            <div style={styles.modalActions}>
              <button
                style={selectedUser.status === 'Activo' ? styles.btnModalDesactivar : styles.btnModalActivar}
                onClick={() => toggleStatus(selectedUser.id)}
              >
                {selectedUser.status === 'Activo' ? 'Desactivar Usuario' : 'Activar Usuario'}
              </button>
              <button style={styles.btnModalCerrar} onClick={() => setSelectedUser(null)}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .user-row { flex-direction: column !important; gap: 12px !important; }
          .user-stats { justify-content: flex-start !important; gap: 24px !important; }
          .actions { flex-direction: row !important; width: 100% !important; }
          .modal-body { flex-direction: column !important; }
          .modal-stats { flex-direction: column !important; }
          .search-row { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: "'Segoe UI', sans-serif",
  },
  content: {
    padding: '32px',
    maxWidth: '1290px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  titleIcon: {
    marginTop: '4px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  subtitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#888',
    //margin: '4px 0 0',
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    padding: '10px 16px',
    minWidth: '200px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '12px',
    color: '#333',
    width: '100%',
    background: 'transparent',
  },
  filtroWrapper: {
    position: 'relative',
    display: 'flex',
  },
  filtroBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    fontSize: '12px',
    color: '#333',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  filtroMenu: {
    position: 'absolute',
    top: '44px',
    right: 0,
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    overflow: 'hidden',
    zIndex: 10,
    minWidth: '160px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
  filtroItem: {
    padding: '10px 16px',
    fontSize: '12px',
    color: '#333',
    cursor: 'pointer',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  userLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    minWidth: '200px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'black',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '15px',
    flexShrink: 0,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  userNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  badgeActivo: {
    background: '#dcfce7',
    color: '#16a34a',
  },
  badgeInactivo: {
    background: '#fee2e2',
    color: '#dc2626',
  },
  userMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#888',
  },
  userStats: {
    display: 'flex',
    gap: '60px',
    alignItems: 'center',
    marginRight: '50px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
  },
  statValueRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  statNum: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statMoney: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#e08c00',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-end',
  },
  btnDetalle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    background: 'transparent',  
    border: '1.5px solid #bababa',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#333',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnDesactivar: {
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '7px 14px',
    background: '#fee2e2',
    border: '1.5px solid #dc2626',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#dc2626',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  btnActivar: {
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '7px 14px',
    background: '#dcfce7',
    border: '1.5px solid #16a34a',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#16a34a',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '16px',
  },
  modal: {
    background: '#fff',
    borderRadius: '20px',
    padding: '32px',
    width: '100%',
    maxWidth: '540px',
    position: 'relative',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '20px',
  },
  modalAvatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: 'Black',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
    flexShrink: 0,
  },
  modalNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  modalName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalEmail: {
    fontSize: '13px',
    color: '#888',
    marginTop: '2px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #f0f0f0',
    margin: '16px 0',
  },
  modalBody: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  modalSection: {
    flex: 1,
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalSectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  modalInfoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#444',
  },
  modalStats: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  modalStatCard: {
    flex: 1,
    minWidth: '140px',
    background: '#fffbea',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalStatLabel: {
    fontSize: '12px',
    color: '#888',
  },
  modalStatValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalStatNum: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalStatIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#e08c00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  btnModalDesactivar: {
    flex: 1,
    padding: '12px',
    background: '#fee2e2',
    border: '1.5px solid #dc2626',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#dc2626',
    cursor: 'pointer',
  },
  btnModalActivar: {
    flex: 1,
    padding: '12px',
    background: '#dcfce7',
    border: '1.5px solid #16a34a',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#16a34a',
    cursor: 'pointer',
  },
  btnModalCerrar: {
    flex: 1,
    padding: '12px',
    background: '#111',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default AdminUsers;