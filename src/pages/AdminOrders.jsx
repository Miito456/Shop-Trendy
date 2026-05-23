import React, { useState } from 'react';
import { Search, Eye, X, MapPin, Calendar, ClipboardList, Filter, ChevronDown, CheckCircle, Clock, Settings, XCircle } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminTabs from '../components/AdminTabs';

const pedidos = [
  { id: 'ORD-2026-001', cliente: 'Ana García', email: 'ana.garcia@email.com', fecha: '2026-04-21', total: '$249.99', status: 'Completado', direccion: 'Calle Mayor 12, Madrid, España', productos: [{ nombre: 'Chaqueta de Cuero', cantidad: 1, precio: '$249.99' }] },
  { id: 'ORD-2026-002', cliente: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', fecha: '2026-04-21', total: '$129.99', status: 'Pendiente', direccion: 'Avenida del Sol 45, Barcelona, España', productos: [{ nombre: 'Vestido Elegante de Noche', cantidad: 1, precio: '$129.99' }] },
  { id: 'ORD-2026-003', cliente: 'María López', email: 'maria.lopez@email.com', fecha: '2026-04-20', total: '$349.99', status: 'Procesando', direccion: 'Plaza Central 8, Valencia, España', productos: [{ nombre: 'Bolso de Diseñador', cantidad: 1, precio: '$349.99' }] },
  { id: 'ORD-2026-004', cliente: 'Juan Pérez', email: 'juan.perez@email.com', fecha: '2026-04-20', total: '$89.99', status: 'Completado', direccion: 'Calle Real 3, Sevilla, España', productos: [{ nombre: 'Calcetines Adidas', cantidad: 2, precio: '$89.99' }] },
  { id: 'ORD-2026-005', cliente: 'Laura Martínez', email: 'laura.martinez@email.com', fecha: '2026-04-19', total: '$199.99', status: 'Procesando', direccion: 'Avenida Norte 22, Bilbao, España', productos: [{ nombre: 'Zapatillas Deportivas', cantidad: 1, precio: '$199.99' }] },
  { id: 'ORD-2026-006', cliente: 'David Sánchez', email: 'david.sanchez@email.com', fecha: '2026-04-18', total: '$179.98', status: 'Completado', direccion: 'Calle Sur 7, Málaga, España', productos: [{ nombre: 'Camiseta Básica', cantidad: 2, precio: '$179.98' }] },
  { id: 'ORD-2026-007', cliente: 'Isabel Fernández', email: 'isabel.fernandez@email.com', fecha: '2026-04-17', total: '$69.99', status: 'Cancelado', direccion: 'Plaza Mayor 1, Zaragoza, España', productos: [{ nombre: 'Accesorios Pack', cantidad: 1, precio: '$69.99' }] },
];

const statusStyles = {
  Completado: { background: '#dcfce7', color: '#16a34a' },
  Pendiente: { background: '#fef9c3', color: '#ca8a04' },
  Procesando: { background: '#dbeafe', color: '#2563eb' },
  Cancelado: { background: '#fee2e2', color: '#dc2626' },
};

const statusIcons = {
  Completado: <CheckCircle size={16} color="#16a34a" />,
  Pendiente: <Clock size={16} color="#ca8a04" />,
  Procesando: <Settings size={16} color="#2563eb" />,
  Cancelado: <XCircle size={16} color="#dc2626" />,
};

function AdminOrders() {
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todos los estados');
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(pedidos);

  const filtered = orders.filter(o => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cliente.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === 'Todos los estados' || o.status === filtro;
    return matchSearch && matchFiltro;
  });

  const updateStatus = (id, newStatus) => {
    let mensaje = '';
    if (newStatus === 'Procesando') mensaje = '¿Marcar este pedido como Procesando?';
    else if (newStatus === 'Completado') mensaje = '¿Marcar este pedido como Completado?';
    else if (newStatus === 'Cancelado') mensaje = '¿Estás seguro de que deseas cancelar este pedido?';

    if (!window.confirm(mensaje)) return;

    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div style={styles.page}>
      <AdminHeader />
      <AdminTabs activeTab="pedidos" />

      <main style={styles.content}>
        {/* Title */}
        <div style={styles.titleRow}>
          <ClipboardList size={22} color="#e08c00" />
          <div>
            <h2 style={styles.title}>Gestión de Pedidos</h2>
            <p style={styles.subtitle}>Administra y monitorea todos los pedidos de la tienda</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ ...styles.searchBox, flex: 1 }}>
            <Search size={16} color="#aaa" />
            <input
              style={styles.searchInput}
              placeholder="Buscar por número de pedido, cliente o email..."
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
                {['Todos los estados', 'Pendiente', 'Procesando', 'Completado', 'Cancelado'].map(op => (
                  <div key={op} style={styles.filtroItem} onClick={() => { setFiltro(op); setFiltroOpen(false); }}>
                    {op}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div style={styles.card}>
          {filtered.map((order, i) => (
            <div key={order.id} style={{ ...styles.orderRow, borderBottom: i < filtered.length - 1 ? '1px solid #f0f0f0' : 'none' }}>

              {/* Icon + Info */}
              <div style={styles.orderLeft}>
                <div style={{ ...styles.orderIcon, background: statusStyles[order.status].background }}>
                  {/*<span style={{ fontSize: '18px' }}>{statusIcons[order.status]}</span>*/}
                  {statusIcons[order.status]}
                </div>
                <div style={styles.orderInfo}>
                  <div style={styles.orderIdRow}>
                    <span style={styles.orderId}>{order.id}</span>
                    <span style={{ ...styles.statusBadge, ...statusStyles[order.status] }}>{order.status}</span>
                  </div>
                  <div style={styles.orderMeta}>{order.cliente}</div>
                  <div style={styles.orderMeta}>{order.email}</div>
                </div>
              </div>

              {/* Date & Total */}
              <div style={styles.orderStats}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Fecha</span>
                  <span style={styles.statValue}>{order.fecha}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Total</span>
                  <span style={styles.statMoney}>{order.total}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={styles.actions}>
                <button style={styles.btnDetalle} onClick={() => setSelectedOrder(order)}>
                  <Eye size={14} /> Ver Detalles
                </button>
                {order.status === 'Pendiente' && (
                  <button style={styles.btnProcesar} onClick={() => updateStatus(order.id, 'Procesando')}>
                    Procesar
                  </button>
                )}
                {order.status === 'Procesando' && (
                  <button style={styles.btnCompletar} onClick={() => updateStatus(order.id, 'Completado')}>
                    Completar
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* Modal Detalles */}
      {selectedOrder && (
        <div style={styles.overlay} onClick={() => setSelectedOrder(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>

            <button style={styles.closeBtn} onClick={() => setSelectedOrder(null)}>
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitleRow}>
                  <span style={styles.modalTitle}>Detalles del Pedido</span>
                  <span style={{ ...styles.statusBadge, ...statusStyles[selectedOrder.status] }}>{selectedOrder.status}</span>
                </div>
                <div style={styles.modalOrderId}>{selectedOrder.id}</div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Cliente & Fecha */}
            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <div style={styles.modalSectionTitle}>Cliente</div>
                <div style={styles.modalClientName}>{selectedOrder.cliente}</div>
                <div style={styles.modalClientEmail}>{selectedOrder.email}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalSectionTitle}>Fecha</div>
                <div style={styles.modalClientName}>{selectedOrder.fecha}</div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Dirección */}
            <div style={styles.modalInfoRow}>
              <div style={styles.modalSectionTitle}>Dirección de Envío</div>
              <div style={styles.modalAddress}>
                <MapPin size={14} color="#e08c00" />
                {selectedOrder.direccion}
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Productos */}
            <div>
              <div style={styles.modalSectionTitle}>Productos</div>
              {selectedOrder.productos.map((p, i) => (
                <div key={i} style={styles.productRow}>
                  <div>
                    <div style={styles.productName}>{p.nombre}</div>
                    <div style={styles.productQty}>Cantidad: {p.cantidad}</div>
                  </div>
                  <div style={styles.productPrice}>{p.precio}</div>
                </div>
              ))}
            </div>

            <hr style={styles.divider} />

            {/* Total */}
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total del Pedido</span>
              <span style={styles.totalValue}>{selectedOrder.total}</span>
            </div>

            {/* Modal Actions */}
            {(selectedOrder.status === 'Pendiente' || selectedOrder.status === 'Procesando') && (
              <>
                <hr style={styles.divider} />
                <div style={styles.modalActions}>
                  {selectedOrder.status === 'Pendiente' && (
                    <button style={styles.btnModalProcesar} onClick={() => updateStatus(selectedOrder.id, 'Procesando')}>
                      Marcar como Procesando
                    </button>
                  )}
                  {selectedOrder.status === 'Procesando' && (
                    <button style={styles.btnModalCompletar} onClick={() => updateStatus(selectedOrder.id, 'Completado')}>
                      Marcar como Completado
                    </button>
                  )}
                  <button style={styles.btnModalCancelar} onClick={() => updateStatus(selectedOrder.id, 'Cancelado')}>
                    Cancelar Pedido
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
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
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  orderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    minWidth: '200px',
  },
  orderIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  orderIdRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  orderId: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statusBadge: {
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  orderMeta: {
    fontSize: '12px',
    color: '#888',
  },
  orderStats: {
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
    color: '#aaa',
  },
  statValue: {
    fontSize: '14px',
    fontWeight: '600',
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
  btnProcesar: {
    padding: '7px 14px',
    background: '#dbeafe',
    border: '1.5px solid #2563eb',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#2563eb',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  btnCompletar: {
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
    marginBottom: '4px',
  },
  modalTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalOrderId: {
    fontSize: '13px',
    color: '#888',
    marginTop: '4px',
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
    minWidth: '140px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  modalSectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  modalClientName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  modalClientEmail: {
    fontSize: '13px',
    color: '#888',
  },
  modalInfoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalAddress: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#444',
  },
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#f9f9f9',
    borderRadius: '10px',
    marginTop: '8px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  productQty: {
    fontSize: '12px',
    color: '#888',
    marginTop: '2px',
  },
  productPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#e08c00',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fffbea',
    borderRadius: '12px',
    padding: '16px 20px',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#e08c00',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  btnModalProcesar: {
    flex: 1,
    padding: '12px',
    background: '#dbeafe',
    border: '1.5px solid #2563eb',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2563eb',
    cursor: 'pointer',
  },
  btnModalCompletar: {
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
  btnModalCancelar: {
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
};

export default AdminOrders;