import React from 'react';
import { Phone, Instagram, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';

function AboutUs() {
  return (
    <main className="main-content" style={styles.container}>
      
      <div style={styles.card}>
        {/* Mapa */}
        <div style={styles.mapSection}>
          <iframe
            title="Ubicación ShopTRENDY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661955009888!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDcnNTkuNSJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
            style={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div style={styles.infoSection}>
          
          <div style={styles.logoRow}>
            <div style={styles.logoCircle}>ST</div>
            <h1 style={styles.title}>
              Shop
              <span style={styles.titleAccent}>TRENDY</span>
            </h1>
          </div>

          <p style={styles.description}>
            Tu destino definitivo para la moda moderna y vanguardista. 
            Ofrecemos las mejores marcas con calidad y estilo en cada prenda. 
            Nos apasiona ayudarte a expresar tu personalidad a través de la moda.
          </p>

          <div style={styles.infoRow}>
            <MapPin size={18} style={styles.infoIcon} />
            <span style={styles.infoText}>Av. Ejemplo 123, Ciudad de México, México</span>
          </div>

          <div style={styles.infoRow}>
            <Clock size={18} style={styles.infoIcon} />
            <span style={styles.infoText}>Lun - Sáb: 10:00 AM – 8:00 PM</span>
          </div>

          <div style={styles.infoRow}>
            <Mail size={18} style={styles.infoIcon} />
            <span style={styles.infoText}>contacto@shoptrendy.com</span>
          </div>

          {/* Redes sociales */}
          <div style={styles.socialRow}>
            <a href="tel:+521234567890" style={styles.socialBtn} title="Teléfono">
              <Phone size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialBtn} title="Instagram">
              <Instagram size={22} />
            </a>
            <a href="https://wa.me/521234567890" target="_blank" rel="noreferrer" style={styles.socialBtn} title="WhatsApp">
              <MessageCircle size={22} />
            </a>
          </div>

        </div>
      </div>

    </main>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: '40px 24px',
    background: '#f5f5f5',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
    maxWidth: '1000px',
    width: '100%',
  },
  mapSection: {
    flex: 1,
    minHeight: '420px',
  },
  map: {
    width: '100%',
    height: '100%',
    border: 'none',
    minHeight: '420px',
  },
  infoSection: {
    flex: 1,
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '16px',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
  },
  logoCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#111',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },

  /*titleAccent: {
    color: '#e08c00',
  },*/

  description: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.7',
    margin: '0',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoIcon: {
    color: '#e08c00',
    flexShrink: 0,
  },
  infoText: {
    fontSize: '14px',
    color: '#444',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    justifyContent: 'right',
  },
  socialBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1.5px solid #e8e8e8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
};

export default AboutUs;