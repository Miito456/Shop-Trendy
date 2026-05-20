import React, { useState } from 'react';
import { Package, Search, Edit2, Trash2, Plus } from 'lucide-react';
import AdminProductModal from '../AdminProductModal';

const ProductsView = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenNewModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      // Add new
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts(prev => [{ ...productData, id: newId }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-products-view">
      <div className="products-view-header">
        <div className="header-left">
          <Package className="section-icon-large orange" size={28} />
          <div>
            <h2>Gestión de Productos</h2>
            <p>Administra el catálogo de productos de tu tienda</p>
          </div>
        </div>
        <button className="btn-new-product" onClick={handleOpenNewModal}>
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      <div className="products-search-bar">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Buscar productos por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="admin-product-item">
            <img src={product.image} alt={product.title} className="ap-image" />
            <div className="ap-details">
              <h4 className="ap-title">{product.title}</h4>
              <p className="ap-desc">{product.description?.substring(0, 60)}...</p>
              <div className="ap-badges">
                <span className="ap-category">{product.category}</span>
                <span className={`ap-stock ${(product.stock || 0) > 10 ? 'high' : 'low'}`}>
                  Stock: {product.stock !== undefined ? product.stock : 15}
                </span>
              </div>
            </div>
            <div className="ap-price">${product.price?.toFixed(2)}</div>
            <div className="ap-actions">
              <button className="ap-btn edit" onClick={() => handleOpenEditModal(product)}>
                <Edit2 size={16} />
              </button>
              <button className="ap-btn delete" onClick={() => handleDelete(product.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default ProductsView;
