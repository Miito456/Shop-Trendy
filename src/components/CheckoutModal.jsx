import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Formulario de pago interno
function CheckoutForm({ total, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePagar = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: 'if_required'
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div>
      <PaymentElement />

      {error && (
        <div style={{
          marginTop: '12px',
          padding: '10px 16px',
          background: '#fee2e2',
          color: '#dc2626',
          borderRadius: '8px',
          fontSize: '13px'
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handlePagar}
        disabled={loading || !stripe}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '14px',
          background: loading ? '#888' : '#111',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)} MXN`}
      </button>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '12px' }}>
        🔒 Pago seguro con Stripe
      </p>
    </div>
  );
}

// Modal principal
function CheckoutModal({ isOpen, onClose, total, onSuccess }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || total <= 0) return;

    fetch('http://localhost:3001/api/payments/create-payment-intent', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ amount: total })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [isOpen, total]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '16px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '32px',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        boxShadow: '0 8px 40px rgba(0,0,0,0.2)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#888'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
          Finalizar Compra
        </h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
          Total a pagar: <strong>${total.toFixed(2)} MXN</strong>
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
            Preparando pago...
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              total={total}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <div style={{ textAlign: 'center', color: '#dc2626' }}>
            Error al iniciar el pago. Intenta de nuevo.
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;