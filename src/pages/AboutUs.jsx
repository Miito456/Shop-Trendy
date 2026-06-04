import React from 'react';
import { Phone, Facebook, Instagram, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';

function AboutUs() {
  return (
    <main className="main-content" style={styles.container}>
      
      <div style={styles.card}>
        {/* Mapa */}
        <div style={styles.mapSection}>
          <iframe
            title="Ubicación ShopTRENDY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.655550011344!2d-104.63687188899146!3d24.007937578405897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb78b2349019d%3A0xd525c621787b7c7!2sFrancisco%20Montoya%20M.%20123%2C%20Centauro%20del%20Nte.%2C%2034166%20Durango%2C%20Dgo.!5e0!3m2!1ses!2smx!4v1780470422820!5m2!1ses!2smx"
            style={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info */}
        <div style={styles.infoSection}>
          
          <div style={styles.logoRow}>
            <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }} />
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
            <span style={styles.infoText}>Francisco Montoya M. 123, Centauro del Nte., 34166 Durango, Dgo., México</span>
          </div>

          <div style={styles.infoRow}>
            <Clock size={18} style={styles.infoIcon} />
            <span style={styles.infoText}>Lun - Vie: 9:00 AM – 9:00 PM</span>
          </div>

          <div style={styles.infoRow}>
            <Mail size={18} style={styles.infoIcon} />
            <span style={styles.infoText}>Pelon1234santos@gmail.com</span>
          </div>

          {/* Redes sociales */}
          <div style={styles.socialRow}>
            <a href="tel:+526182611596" style={styles.socialBtn} title="Teléfono">
              <Phone size={22} />
            </a>
            <a href="https://www.facebook.com/share/1D7cZdpLa2/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={styles.socialBtn} title="Facebook">
              <Facebook size={22} />
            </a>
            <a href="https://www.instagram.com/shop_trendydgo?igsh=MTVsMXk5Y3JtNHVkYQ==" target="_blank" rel="noreferrer" style={styles.socialBtn} title="Instagram">
              <Instagram size={22} />
            </a>
            <a href="https://wa.me/526182611596" target="_blank" rel="noreferrer" style={styles.socialBtn} title="WhatsApp">
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