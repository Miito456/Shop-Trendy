import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, StarHalf, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabaseClient';
import CheckoutModal from '../components/CheckoutModal'; 

function ProductDetailPage({ cart, addToCart, products, user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);


  useEffect(() => {
  window.scrollTo(0, 0);
  
  

  if (products && products.length > 0) {
    const foundProduct = products.find(p => String(p.id) === String(id));
    console.log('producto encontrado:', foundProduct);
    setProduct(foundProduct);
    setQuantity(1);
  } else {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('producto del backend:', data);
        setProduct(data);
        setQuantity(1);
      })
      .catch(err => {
        console.error('Error cargando producto:', err);
      });
  }
}, [id, products]);

  if (!product) {
    return <div className="product-not-found">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, quantity });
  };

  const handleBuyNow = () => {
  if (!user) { alert('Debes iniciar sesión para comprar'); return; }
  setShowCheckout(true);
};

const handlePaymentSuccess = async () => {
  setShowCheckout(false);
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    let shippingAddress = 'No especificada';
    if (userId) {
      const perfilRes = await fetch(`http://localhost:3001/api/users/${userId}`);
      const perfil = await perfilRes.json();
      shippingAddress = perfil.address || 'No especificada';
    }

    const orden = {
      user_id:          userId,
      customer_name:    user.name,
      customer_email:   user.email,
      total:            parseFloat(product.price) * quantity,
      status:           'Pendiente',
      shipping_address: shippingAddress,
      products: [{
        name:     product.title,
        quantity: quantity,
        price:    parseFloat(product.price)
      }]
    };

    const res = await fetch('http://localhost:3001/api/orders', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(orden)
    });

    if (!res.ok) throw new Error('Error al crear la orden');

    const newStock = Math.max(0, (product.stock || 0) - quantity);
    await fetch(`http://localhost:3001/api/productos/${product.id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...product, stock: newStock, isSoldOut: newStock <= 0 })
    });

    alert('¡Compra realizada con éxito! Tu pedido está siendo procesado.');
    navigate('/shop');
    window.location.reload();

  } catch (error) {
    console.error('Error al crear la orden tras el pago:', error);
    alert('Pago exitoso, pero hubo un error al registrar la orden. Contacta soporte.');
  }
};

  // Dummy related products (excluding the current one)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>{product.title}</span>
      </div>

      <div className="product-main-section">
        {/* Left Column: Images */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={product.image} alt={product.title} className="main-image" />
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="product-info-section">
          <span className="category-pill">{product.category}</span>
          <h1 className="product-title-large">{product.title}</h1>

          <div className="product-rating">
            <div className="stars">
              <Star fill="#facc15" stroke="none" size={16} />
              <Star fill="#facc15" stroke="none" size={16} />
              <Star fill="#facc15" stroke="none" size={16} />
              <Star fill="#facc15" stroke="none" size={16} />
              <StarHalf fill="#facc15" stroke="none" size={16} />
            </div>
            <span className="rating-text">4.7 (3 reseñas)</span>
          </div>

          <div className="product-price-large">
            ${parseFloat(product.price).toFixed(2)}
          </div>

          <p className="product-short-desc">
            {product.description}
          </p>

          

          <div className="quantity-selector">
            <p className="selector-title">Cantidad</p>
            <div className="qty-controls">
              <button onClick={() => setQuantity(Math.max(1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-add-to-cart" onClick={handleAddToCart} disabled={product.isSoldOut}>
              <ShoppingCart size={18} /> Agregar al Carrito
            </button>
            <button className="btn-buy-now" disabled={product.isSoldOut} onClick={handleBuyNow}>
              Comprar Ahora
            </button>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <Truck size={20} className="feature-icon" />
              <div>
                <strong>Envío Gratis</strong>
                <p>En pedidos superiores a $100</p>
              </div>
            </div>
            <div className="feature-item">
              <RotateCcw size={20} className="feature-icon" />
              <div>
                <strong>Devoluciones Fáciles</strong>
                <p>30 días para devoluciones</p>
              </div>
            </div>
            <div className="feature-item">
              <ShieldCheck size={20} className="feature-icon" />
              <div>
                <strong>Compra Segura</strong>
                <p>Pago 100% protegido</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tab-headers">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Descripción
          </button>

          {/*}
          <button
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Detalles
          </button>
            */}

          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reseñas (3)
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'description' && (
            <>
              <h4>Descripción del Producto</h4>
              <p>
                {product.description}
                
                
              </p>
            </>
          )}
          
          {/*}
          {activeTab === 'details' && (
            <div className="product-details-list">
              <h4>Características Principales</h4>
              <ul>
                <li><strong>Material:</strong> 100% Algodón Premium de alta resistencia.</li>
                <li><strong>Ajuste:</strong> Corte regular fit que se adapta perfectamente a la silueta.</li>
                <li><strong>Instrucciones de cuidado:</strong> Lavar a máquina con agua fría, no usar blanqueador, secar a la sombra.</li>
                <li><strong>Origen:</strong> Diseñado en España, fabricado de forma sostenible.</li>
                <li><strong>Detalle adicional:</strong> Costuras reforzadas para mayor durabilidad.</li>
              </ul>
            </div>
          )}
            */}

          {activeTab === 'reviews' && (
            <div className="product-reviews-list">
              <div className="review-item">
                <div className="review-header">
                  <strong>María G.</strong>
                  <div className="stars">
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                  </div>
                </div>
                <p>"Excelente calidad, superó mis expectativas. La tela es muy suave y el ajuste es perfecto. ¡Definitivamente compraré de nuevo!"</p>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>Carlos R.</strong>
                  <div className="stars">
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <StarHalf fill="#facc15" stroke="none" size={14} />
                  </div>
                </div>
                <p>"El diseño es muy elegante, ideal para eventos formales. Llegó antes de lo esperado en un empaque muy cuidado."</p>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>Ana L.</strong>
                  <div className="stars">
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#facc15" stroke="none" size={14} />
                    <Star fill="#e5e7eb" stroke="none" size={14} />
                  </div>
                </div>
                <p>"Buena prenda en general. Tuve que pedir una talla menos porque viene ligeramente amplia, pero la calidad es indiscutible."</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <div className="related-header">
          <ShoppingCart className="icon-light" size={24} color="#e5e5e5" />
          <h3>También te puede interesar</h3>
        </div>
        <div className="related-grid">
          {relatedProducts.map(rp => (
            <ProductCard
              key={rp.id} 
              product={rp}
              onAddToCart={() => addToCart(rp)}
            />
          ))}
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        total={parseFloat(product.price) * quantity}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default ProductDetailPage;
