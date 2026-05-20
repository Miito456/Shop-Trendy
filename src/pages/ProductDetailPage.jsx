import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, StarHalf, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

function ProductDetailPage({ cart, addToCart, products }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Scroll to top when loading new product
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return <div className="product-not-found">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, quantity });
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
          <div className="thumbnail-list">
            <img src={product.image} alt="thumb 1" className="thumbnail active" />
            <img src={product.image} alt="thumb 2" className="thumbnail" />
            <img src={product.image} alt="thumb 3" className="thumbnail" />
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
            ${product.price.toFixed(2)}
          </div>

          <p className="product-short-desc">
            {product.description}
          </p>

          <div className="size-selector">
            <p className="selector-title">Selecciona tu talla</p>
            <div className="size-options">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <p className="selector-title">Cantidad</p>
            <div className="qty-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-add-to-cart" onClick={handleAddToCart} disabled={product.isSoldOut}>
              <ShoppingCart size={18} /> Agregar al Carrito
            </button>
            <button className="btn-buy-now" disabled={product.isSoldOut}>
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
          <button
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Detalles
          </button>
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
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipiscing elit malesuada, purus eleifend integer aliquam risus auctor viverra erat metus, maecenas
                montes mus hendrerit phasellus tellus vehicula. Ultricies aptent malesuada arcu tempus ultrices leo ullamcorper faucibus, bibendum
                ante nibh scelerisque per nisl eget pellentesque facilisis, mus metus sem laoreet in non a.
              </p>
            </>
          )}

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
    </div>
  );
}

export default ProductDetailPage;
