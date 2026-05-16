import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

import { Link } from 'react-router-dom'; //Anexado para el enlace del administrador

function Footer({onAdminClick}) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-container">
            <div className="logo-circle">ST</div>
            <span className="logo-text">Shop Trendy</span>
          </div>
          <p className="footer-description">
            Tu destino definitivo para la moda moderna y vanguardista. 
            Calidad y estilo en cada prenda.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Tienda</h4>
          <ul className="footer-links">
            <li><a href="#">Ropa de Hombre</a></li>
            <li><a href="#">Ropa de Mujer</a></li>
            <li><a href="#">Accesorios</a></li>
            <li><a href="#">Nuevas Llegadas</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Soporte</h4>
          <ul className="footer-links">
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Envíos y Devoluciones</a></li>
            <li><a href="/about">Contáctanos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onAdminClick(); }}>Administrador</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-title">Suscríbete</h4>
          <p className="newsletter-text">Recibe las últimas noticias y ofertas exclusivas.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" />
            <button className="newsletter-btn"><Mail size={18} /></button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shop Trendy. Todos los derechos reservados.</p>
        <div className="footer-legal">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
