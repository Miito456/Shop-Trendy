import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card light-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="product-image-container-light">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image-light"
          />
          {product.isSoldOut && (
            <span className="badge-sold-out-light">Agotado</span>
          )}
        </div>
      </Link>
      
      <div className="product-info-light">
        <span className="product-category-tag-light">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-link title-link">
          <h4 className="product-title-light">{product.title}</h4>
        </Link>
        <p className="product-desc-light">{product.description}</p>
        
        <div className="product-footer-light">
          <span className="product-price-light">
            ${parseFloat(product.price).toFixed(2)}
            
          </span>
          <button 
            className="btn-add-light" 
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            disabled={product.isSoldOut}
          >
            <ShoppingCart className="btn-add-icon-light" size={16} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
