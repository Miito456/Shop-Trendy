import React, { useState } from 'react';
import { Phone, Facebook, Instagram, MessageCircle, Twitter, Mail, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Footer({ onAdminClick }) {
  const [supportModalInfo, setSupportModalInfo] = useState(null);
  const location = useLocation();

  const openSupportModal = (title, content) => {
    setSupportModalInfo({ title, content });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container">
              <img src="/logo.png" alt="Shop Trendy Logo" className="brand-logo" onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }} />
              <span className="logo-text">Shop Trendy</span>
            </div>
            <p className="footer-description">
              Tu destino definitivo para la moda moderna y vanguardista.
              Calidad y estilo en cada prenda.
            </p>
            <div className="social-links">
              <a href="tel:+526182611596" className="social-icon"><Phone size={20} /></a>
              <a href="https://www.facebook.com/share/1D7cZdpLa2/?mibextid=wwXIfr" className="social-icon"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/shop_trendydgo?igsh=MTVsMXk5Y3JtNHVkYQ==" className="social-icon"><Instagram size={20} /></a>
              <a href="https://wa.me/526182611596" className="social-icon"><MessageCircle size={20} /></a>
            </div>
          </div>
    
          <div className="footer-links-group">
            <h4 className="footer-title">Tienda</h4>
            <ul className="footer-links">
              <li><Link to="/shop" state={{ category: 'ropa-hombre' }}>Ropa de Hombre</Link></li>
              <li><Link to="/shop" state={{ category: 'ropa-mujer' }}>Ropa de Mujer</Link></li>
              <li><Link to="/shop" state={{ category: 'accesorios' }}>Accesorios</Link></li>
              <li><Link to="/shop" state={{ category: 'todos' }}>Nuevas Llegadas</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Soporte</h4>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); openSupportModal('Preguntas Frecuentes', 'Aquí encontrarás respuestas a las dudas más comunes sobre pagos, métodos de envío y más.'); }}>
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); openSupportModal('Envíos y Devoluciones', 'Ofrecemos envíos gratis en compras mayores a $500. Las devoluciones son gratuitas dentro de los primeros 30 días.'); }}>
                  Envíos y Devoluciones
                </a>
              </li>
              <li><Link to="/about">Contáctanos</Link></li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onAdminClick(); }}>
                  Administrador
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Shop Trendy. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <a href="#" onClick={(e) => { e.preventDefault(); openSupportModal('Privacidad', 'Aviso de privacidad detallado sobre el manejo de tus datos...'); }}>Privacidad</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openSupportModal('Términos', 'Términos y condiciones de uso de la plataforma...'); }}>Términos</a>
          </div>
        </div>
      </footer>

      {supportModalInfo && (
        <div className="modal-overlay" onClick={() => setSupportModalInfo(null)} style={{ zIndex: 9999 }}>
          <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSupportModalInfo(null)}>
              <X size={20} />
            </button>
            <h2 className="modal-title" style={{ marginBottom: '1rem' }}>{supportModalInfo.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {supportModalInfo.content}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
