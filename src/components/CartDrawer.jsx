import React from 'react';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart, user }) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  const handleFinalizarCompra = async () => {
    // Verificar que el usuario esté autenticado
    if (!user) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    try {
      // Obtener el ID del usuario de Supabase
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Obtener dirección del usuario
      let shippingAddress = 'No especificada';
      if (userId) {
        const perfilRes = await fetch(`http://localhost:3001/api/users/${userId}`);
        const perfil = await perfilRes.json();
        shippingAddress = perfil.address || 'No especificada';
      }

      // Crear la orden
      const orden = {
        user_id:          userId,
        customer_name:    user.name,
        customer_email:   user.email,
        total:            subtotal,
        status:           'Pendiente',
        shipping_address: shippingAddress,
        products:         cart.map(item => ({
          name:     item.title,
          quantity: item.quantity,
          price:    parseFloat(item.price)
        }))
      };

      const res = await fetch('http://localhost:3001/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(orden)
      });

      if (!res.ok) throw new Error('Error al crear la orden');

      alert('¡Compra realizada con éxito! Tu pedido está siendo procesado.');
      clearCart();
      onClose();

    } catch (error) {
      console.error('Error al finalizar compra:', error);
      alert('Error al procesar la compra. Intenta de nuevo.');
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div>
            <h2 className="modal-title">Carrito de Compras</h2>
            <p className="modal-subtitle" style={{ marginBottom: 0 }}>
              Revisa y administra los productos en tu carrito
            </p>
          </div>
          <button className="modal-close-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-content">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={80} color="#ccc" strokeWidth={1} />
              <h3>Tu carrito está vacío</h3>
              <p>Agrega productos para comenzar tu compra</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.cartId || item.id} className="cart-item">
                  <div className="cart-item-image-wrapper">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <h4>{item.title}</h4>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.cartId || item.id)}>
                        <X size={16} />
                      </button>
                    </div>
                    <span className="cart-item-price">${parseFloat(item.price).toFixed(2)}</span>
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span className="summary-label">Envío</span>
              <span className="summary-value">Gratis</span>
            </div>
            <div className="cart-summary-row total-row">
              <span className="summary-label">Total</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary-full mt-4" onClick={handleFinalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;