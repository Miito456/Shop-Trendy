import React, { useState } from 'react';
import { X } from 'lucide-react';
// 1. Importamos el cliente de Supabase (ajusta los puntos ../ si es necesario)
import { supabase } from '../lib/supabaseClient'; 

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // 2. Estados para capturar el texto de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 3. Función para iniciar sesión o registrarse con Correo/Contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'login') {
        // --- LOGIN CON SUPABASE ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        alert('¡Inicio de sesión correcto!');
        onLogin({
          name: data.user.user_metadata?.full_name || 'Usuario',
          email: data.user.email
        });
        onClose();
        
      } else {
        // --- REGISTRO CON SUPABASE ---
        if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: name, // Guardamos el nombre en los metadatos de Supabase
            },
          },
        });

        if (error) throw error;

        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        setActiveTab('login'); // Cambiamos de pestaña para que se loguee
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. Función para iniciar sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirige automáticamente al origen de tu web local o producción
          redirectTo: typeof window !== 'undefined' ? window.location.origin : '', 
        },
      });
      if (error) throw error;
    } catch (error) {
      alert(`Error al conectar con Google: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">Bienvenido a Shop-Trendy</h2>
        <p className="modal-subtitle">Inicia sesión o crea una cuenta para continuar</p>

        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {activeTab === 'register' && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Tu Nombre" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="usuario@gmail.com" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {activeTab === 'register' && (
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="form-input" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
          )}

          <button type="submit" className="btn-primary-full" disabled={loading}>
            {loading ? 'Cargando...' : activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        {/* --- DIVIDER "O" --- */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', color: '#888' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #eee' }} />
          <span style={{ margin: '0 10px', fontSize: '13px', fontWeight: '500' }}>O</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #eee' }} />
        </div>

        {/* --- BOTÓN DE GOOGLE --- */}
        <button 
          type="button" 
          onClick={handleGoogleSignIn} 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '11px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            gap: '10px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.58z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"/>
          </svg>
          Continuar con Google
        </button>

      </div>
    </div>
  );
};

export default AuthModal;