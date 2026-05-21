import React from 'react';
import { ClipboardList, TrendingUp, AlertCircle, DollarSign, Package, Users } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminTabs from '../components/AdminTabs';

const stats = [
  { label: 'Ingresos Totales', value: '$45,280.50', change: '+12.5% vs mes anterior', color: '#22c55e', bg: '#dcfce7', icon: <DollarSign size={20} color="#22c55e" /> },
  { label: 'Pedidos', value: '324', change: '+8.2% vs mes anterior', color: '#3b82f6', bg: '#dbeafe', icon: <ClipboardList size={20} color="#3b82f6" /> },
  { label: 'Productos', value: '156', change: '+5.1% vs mes anterior', color: '#e08c00', bg: '#ffedd5', icon: <Package size={20} color="#e08c00" /> },
  { label: 'Usuarios', value: '1248', change: '+15.3% vs mes anterior', color: '#a855f7', bg: '#f3e8ff', icon: <Users size={20} color="#a855f7" /> },
];

const recentOrders = [
  { name: 'Ana García', date: '2026-04-21', amount: '$249.99', status: 'Completado' },
  { name: 'Carlos Ruiz', date: '2026-04-21', amount: '$129.99', status: 'Pendiente' },
  { name: 'María López', date: '2026-04-20', amount: '$349.99', status: 'Procesando' },
  { name: 'Juan Pérez', date: '2026-04-20', amount: '$89.99', status: 'Completado' },
  { name: 'Laura Martínez', date: '2026-04-19', amount: '$199.99', status: 'Procesando' },
];

const topProducts = [
  { name: 'Chaqueta de Cuero', sales: '45 ventas', revenue: '$11,249.55' },
  { name: 'Reloj de Pulsera Luxury', sales: '32 ventas', revenue: '$11,199.68' },
  { name: 'Vestido Elegante de Noche', sales: '38 ventas', revenue: '$4,939.62' },
  { name: 'Bolso de Diseñador', sales: '28 ventas', revenue: '$5,599.72' },
  { name: 'Zapatillas Deportivas', sales: '52 ventas', revenue: '$4,679.48' },
];

const statusStyles = {
  Completado: { background: '#dcfce7', color: '#16a34a' },
  Pendiente: { background: '#fef9c3', color: '#ca8a04' },
  Procesando: { background: '#dbeafe', color: '#2563eb' },
};

function AdminDashboard() {
  return (
    <div style={styles.page}>
      <AdminHeader />
      <AdminTabs activeTab="dashboard" />

      <main style={styles.content}>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
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

        {/* Alerta Stock Bajo */}
        <div style={styles.alertBox}>
          <AlertCircle size={24} color="#e08c00" />
          <div>
            <div style={styles.alertTitle}>Productos con Stock Bajo</div>
            <div style={styles.alertText}>
              Hay 3 productos con menos de 5 unidades en inventario. Revisa la sección de productos para reponer stock.
            </div>
          </div>
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
            {recentOrders.map((order, i) => (
              <div key={i} style={styles.orderRow}>
                <div>
                  <div style={styles.orderName}>{order.name}</div>
                  <div style={styles.orderDate}>{order.date}</div>
                </div>
                <div style={styles.orderRight}>
                  <span style={styles.orderAmount}>{order.amount}</span>
                  <span style={{ ...styles.statusBadge, ...statusStyles[order.status] }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <TrendingUp size={18} color="#e08c00" />
              <div>
                <div style={styles.cardTitle}>Productos Más Vendidos</div>
                <div style={styles.cardSub}>Top 5 productos este mes</div>
              </div>
            </div>
            {topProducts.map((product, i) => (
              <div key={i} style={styles.productRow}>
                <div style={styles.productRank}>{i + 1}</div>
                <div style={styles.productInfo}>
                  <div style={styles.productName}>{product.name}</div>
                  <div style={styles.productSales}>{product.sales}</div>
                </div>
                <div style={styles.productRevenue}>{product.revenue}</div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
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
    fontWeight: '500',
  },
  statIconBox: {
    width: '35px',
    height: '35px',
    borderRadius: '8px',
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
  alertBox: {
    background: '#fffbea',
    border: '1px solid #f5e4a0',
    borderRadius: '12px',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  alertTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ad771a',
    marginBottom: '4px',
  },
  alertText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#e08c00',
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
    marginRight: '16px',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    width: '100px',
    textAlign: 'center',
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
    fontSize: '12px',
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
  
};

export default AdminDashboard;