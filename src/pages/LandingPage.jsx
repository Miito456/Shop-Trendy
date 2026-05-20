import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Users, Award, Sparkles, ShieldCheck } from 'lucide-react';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">
          Bienvenido a Shop-Trendy
        </h1>

        <p className="landing-description">
          Descubre las últimas tendencias en moda.
          Prendas exclusivas, vestidos y accesorios de diseñador
          para destacar tu identidad en cada momento.
        </p>

        <div className="landing-actions">
          <Link to="/shop" className="btn-primary-large">
            Ver colección completa <ArrowRight size={20} />
          </Link>
          <a href="#featured" className="btn-secondary-large">
            Lo más destacado <ShoppingBag size={20} />
          </a>
        </div>
      </div>

      {/* Boutique Image Showcase */}
      <div className="boutique-showcase" id="featured">
        <h3 className="showcase-title">Nuestras categorías exclusivas</h3>
        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-image-wrapper">
              <img src="/womens_clothing.png" alt="Moda Mujer" className="showcase-image" />
            </div>
            <div className="showcase-info">
              <h4>Moda Femenina</h4>
              <p>Prendas para cualquier tipo de ocasión</p>
              <Link to="/shop" className="showcase-link">Explorar <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="showcase-card highlight-card">
            <div className="showcase-image-wrapper">
              <img src="/mens_clothing.png" alt="Moda Hombre" className="showcase-image" />
            </div>
            <div className="showcase-info">
              <h4>Moda Masculina</h4>
              <p>Viste como el hombre que quieres ser</p>
              <Link to="/shop" className="showcase-link">Explorar <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="showcase-card">
            <div className="showcase-image-wrapper">
              <img src="/accessories.png" alt="Accesorios" className="showcase-image" />
            </div>
            <div className="showcase-info">
              <h4>Accesorios</h4>
              <p>Accesorios que combinan con todos tus outfits</p>
              <Link to="/shop" className="showcase-link">Explorar <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-stats">
        <div className="stat-item">
          <div className="stat-icon-wrap">
            <Users size={22} strokeWidth={1.5} />
          </div>
          <div className="stat-text">
            <h4>10k+</h4>
            <p>Clientes Satisfechos</p>
          </div>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <div className="stat-icon-wrap gold">
            <Star size={22} fill="#facc15" stroke="none" />
          </div>
          <div className="stat-text">
            <h4>4.9 <span className="stat-sub">/ 5</span></h4>
            <p>Calificación Promedio</p>
          </div>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <div className="stat-icon-wrap">
            <Sparkles size={22} strokeWidth={1.5} />
          </div>
          <div className="stat-text">
            <h4>500+</h4>
            <p>Diseños Exclusivos</p>
          </div>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <div className="stat-icon-wrap">
            <ShieldCheck size={22} strokeWidth={1.5} />
          </div>
          <div className="stat-text">
            <h4>100%</h4>
            <p>Compra Segura</p>
          </div>
        </div>
      </div>

      {/* About Us / Store Location Section */}
      <div className="about-section" id="about">
        <div className="about-content">
          <h2 className="about-title">Visítanos en nuestra tienda</h2>
          <p className="about-description">
            Experimenta la calidad de nuestras prendas en persona. Nuestro equipo de asesores de imagen estará encantado de ayudarte a encontrar el estilo perfecto para ti.
          </p>
          <div className="store-info-list">
            <div className="store-info-item">
              <strong>Dirección:</strong>
              <p>Calle Coronado #931, entre Hidalgo y Zaragoza, Zona Centro, Durango, Dgo., México</p>
            </div>
            <div className="store-info-item">
              <strong>Horarios:</strong>
              <p>Lunes a Sábado: 10:00 AM - 8:00 PM<br />Domingo: 11:00 AM - 6:00 PM</p>
            </div>
            <div className="store-info-item">
              <strong>Contacto:</strong>
              <p>+52 (618) 123-4567<br />hola@shoptrendy.com</p>
            </div>
          </div>
        </div>
        <div className="about-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14865.224506826!2d-104.6739!3d24.0277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb85d60ed9043%3A0x2e8d23dd635e62a3!2sCentro%20Hist%C3%B3rico%2C%20Durango%2C%20Dgo.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la tienda"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
