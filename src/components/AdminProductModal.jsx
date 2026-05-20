import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, AlertCircle } from 'lucide-react';

const AdminProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Ropa Mujer',
    stock: '',
    image: '',
    description: ''
  });

  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        category: product.category || 'Ropa Mujer',
        stock: product.stock || 0,
        image: product.image || '',
        description: product.description || ''
      });
      setImagePreview(product.image || '');
      setImageError('');
    } else {
      setFormData({
        title: '',
        price: '',
        category: 'Ropa Mujer',
        stock: '',
        image: '',
        description: ''
      });
      setImagePreview('');
      setImageError('');
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      setImageError('La imagen excede el límite de 2MB. Elige un archivo más pequeño.');
      setImagePreview('');
      setFormData(prev => ({ ...prev, image: '' }));
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check size limit (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setImageError('La imagen excede el límite de 2MB. Elige un archivo más pequeño.');
        setImagePreview('');
        setFormData(prev => ({ ...prev, image: '' }));
        return;
      }

      setImageError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      setImageError('La imagen del producto es obligatoria.');
      return;
    }
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0
    });
  };

  const isEdit = !!product;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-product-modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className="modal-title">{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <p className="modal-subtitle">
          {isEdit ? 'Modifica la información del producto' : 'Completa los datos para crear un nuevo producto'}
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input 
              type="text" 
              name="title"
              placeholder="Ej: Vestido Elegante" 
              className="form-input" 
              value={formData.title}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Precio ($)</label>
              <input 
                type="number" 
                name="price"
                step="0.01"
                placeholder="0.00" 
                className="form-input" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group half">
              <label>Stock</label>
              <input 
                type="number" 
                name="stock"
                placeholder="0" 
                className="form-input" 
                value={formData.stock}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select 
              name="category"
              className="form-input" 
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Ropa Mujer">Ropa Mujer</option>
              <option value="Ropa Hombre">Ropa Hombre</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Calzado">Calzado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Imagen del Producto</label>
            <div 
              className={`image-upload-zone ${imagePreview ? 'has-image' : ''} ${isDragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('product-image-input').click()}
            >
              <input 
                id="product-image-input"
                type="file" 
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              
              {imagePreview ? (
                <div className="image-upload-preview-container" onClick={e => e.stopPropagation()}>
                  <img src={imagePreview} alt="Vista previa del producto" className="image-upload-preview" />
                </div>
              ) : (
                <div className="image-upload-placeholder">
                  <Upload size={32} strokeWidth={1.5} />
                  <span className="upload-title">Haz clic para subir o arrastra una imagen aquí</span>
                  <span className="upload-desc">Formatos soportados: JPG, PNG, WEBP (Max: 2MB)</span>
                </div>
              )}
            </div>
            
            {imagePreview && (
              <div className="image-upload-actions">
                <button 
                  type="button" 
                  className="image-upload-btn-secondary"
                  onClick={() => document.getElementById('product-image-input').click()}
                >
                  <Upload size={14} /> Cambiar Imagen
                </button>
                <button 
                  type="button" 
                  className="image-upload-btn-secondary"
                  style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            )}
            
            {imageError && (
              <div className="image-upload-error-msg">
                <AlertCircle size={14} /> {imageError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="description"
              placeholder="Describe el producto..." 
              className="form-input" 
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required 
            ></textarea>
          </div>
          
          <div className="modal-actions">
            <button type="submit" className="btn-primary-full btn-save">
              {isEdit ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
            <button type="button" className="btn-secondary-full btn-cancel" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductModal;
