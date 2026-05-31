import React, { useState, useEffect } from 'react';
import { ClipboardList, TrendingUp, AlertCircle } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminTabs from '../components/AdminTabs';

const statusStyles = {
  Completado: { background: '#dcfce7', color: '#16a34a' },
  Pendiente:  { background: '#fef9c3', color: '#ca8a04' },
  Procesando: { background: '#dbeafe', color: '#2563eb' },
};

function AdminDashboard() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/orders/stats')
      .then(res => res.json())
      .then(data => {
        setStatsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando stats:', err);
        setLoading(false);
      });
  }, []);

  const statsCards = statsData ? [
    { label: 'Ingresos Totales', value: `$${parseFloat(statsData.ingresos || 0).toFixed(2)}`, change: 'Total de ventas completadas', color: '#22c55e', bg: '#dcfce7', icon: '💵' },
    { label: 'Pedidos', value: statsData.pedidos || 0, change: 'Total de pedidos', color: '#3b82f6', bg: '#dbeafe', icon: '🛒' },
    { label: 'Productos', value: statsData.productos || 0, change: 'Productos en catálogo', color: '#f97316', bg: '#ffedd5', icon: '📦' },
    { label: 'Usuarios', value: statsData.usuarios || 0, change: 'Usuarios registrados', color: '#a855f7', bg: '#f3e8ff', icon: '👥' },
  ] : [];

  if (loading) {
    return (
      <div style={styles.page}>
        <AdminHeader />
        <AdminTabs activeTab="dashboard" />
        <main style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
          Cargando dashboard...
        </main>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <AdminHeader />
      <AdminTabs activeTab="dashboard" />

      <main style={styles.content}>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {statsCards.map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statTop}>
                <span style={styles.statLabel}>{stat.label}</span>
                <div style={{ ...styles.statIconBox, background: stat.bg }}>
                  {stat.icon}
                </div>
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={{ ...styles.statChange, color: stat.color }}>
                <TrendingUp size={13} /> {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Pedidos Recientes & Top Productos */}
        <div style={styles.twoCol}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <ClipboardList size={18} color="#e08c00" />
              <div>
                <div style={styles.cardTitle}>Pedidos Recientes</div>
                <div style={styles.cardSub}>Últimos pedidos realizados</div>
              </div>
            </div>
            {statsData?.recientes?.length > 0 ? (
              statsData.recientes.map((order, i) => (
                <div key={order.id} style={styles.orderRow}>
                  <div>
                    <div style={styles.orderName}>{order.customer_name}</div>
                    <div style={styles.orderDate}>{order.date}</div>
                  </div>
                  <div style={styles.orderRight}>
                    <span style={styles.orderAmount}>
                      ${parseFloat(order.total).toFixed(2)}
                    </span>
                    <span style={{ ...styles.statusBadge, ...statusStyles[order.status] }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#888', padding: '1rem' }}>
                No hay pedidos aún
              </div>
            )}
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <TrendingUp size={18} color="#e08c00" />
              <div>
                <div style={styles.cardTitle}>Productos en Catálogo</div>
                <div style={styles.cardSub}>Últimos productos agregados</div>
              </div>
            </div>
            {statsData?.ultimosProductos?.length > 0 ? (
              statsData.ultimosProductos.map((product, i) => (
                <div key={product.id} style={styles.productRow}>
                  <div style={styles.productRank}>{i + 1}</div>
                  <div style={styles.productInfo}>
                    <div style={styles.productName}>{product.title}</div>
                    <div style={styles.productSales}>{product.category}</div>
                  </div>
                  <div style={styles.productRevenue}>
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#888', padding: '1rem' }}>
                No hay productos aún
              </div>
            )}
          </div>
        </div>

        {/* Alerta Stock Bajo */}
        <div style={styles.alertBox}>
          <AlertCircle size={20} color="#e08c00" />
          <div>
            <div style={styles.alertTitle}>Información del Sistema</div>
            <div style={styles.alertText}>
              Tienes {statsData?.productos || 0} productos en catálogo y {statsData?.usuarios || 0} usuarios registrados en la plataforma.
            </div>
          </div>
        </div>

      </main>
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
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '13px',
    color: '#888',
  },
  statIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statChange: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardSub: {
    fontSize: '12px',
    color: '#888',
  },
  orderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
    flexWrap: 'wrap',
    gap: '8px',
  },
  orderName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  orderDate: {
    fontSize: '12px',
    color: '#888',
  },
  orderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  orderAmount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  productRank: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#111',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  productSales: {
    fontSize: '12px',
    color: '#888',
  },
  productRevenue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e08c00',
  },
  alertBox: {
    background: '#fffbea',
    border: '1px solid #f5e4a0',
    borderRadius: '12px',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  alertTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e08c00',
    marginBottom: '4px',
  },
  alertText: {
    fontSize: '13px',
    color: '#666',
  },
};

export default AdminDashboard;