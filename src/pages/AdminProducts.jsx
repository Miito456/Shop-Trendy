import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, Plus, Pencil, Trash2, X, ShoppingBag, ImagePlus, Box, ChevronDown, Filter } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminTabs from '../components/AdminTabs';

const categorias = [
  { slug: 'ropa-mujer', label: 'Ropa Mujer' },
  { slug: 'ropa-hombre', label: 'Ropa Hombre' },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'calzado', label: 'Calzado' },
];

const categoryLabels = {
  'ropa-mujer': 'Ropa Mujer',
  'ropa-hombre': 'Ropa Hombre',
  'accesorios': 'Accesorios',
  'calzado': 'Calzado',
  'Ropa Mujer': 'Ropa Mujer',
  'Ropa Hombre': 'Ropa Hombre',
  'Accesorios': 'Accesorios',
  'Calzado': 'Calzado',
};

const categorySlugs = {
  'Ropa Mujer': 'ropa-mujer',
  'Ropa Hombre': 'ropa-hombre',
  'Accesorios': 'accesorios',
  'Calzado': 'calzado',
  'ropa-mujer': 'ropa-mujer',
  'ropa-hombre': 'ropa-hombre',
  'accesorios': 'accesorios',
  'calzado': 'calzado',
};

const categoryColors = {
  'ropa-mujer': { background: '#fce7f3', color: '#be185d' },
  'ropa-hombre': { background: '#dbeafe', color: '#1d4ed8' },
  'accesorios': { background: '#dcfce7', color: '#15803d' },
  'calzado': { background: '#fef9c3', color: '#854d0e' },
  'Ropa Mujer': { background: '#fce7f3', color: '#be185d' },
  'Ropa Hombre': { background: '#dbeafe', color: '#1d4ed8' },
  'Accesorios': { background: '#dcfce7', color: '#15803d' },
  'Calzado': { background: '#fef9c3', color: '#854d0e' },
};

const emptyForm = { title: '', price: '', stock: '', category: 'ropa-mujer', description: '', imagen: null, imagenPreview: null };

function FormContent({ form, setForm, isEdit, fileInputRef, editFileInputRef, handleImageChange }) {
  return (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>Nombre del Producto</label>
        <input
          style={styles.input}
          placeholder="Ej: Vestido Elegante"
          value={form.title}
          onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div style={styles.formRow}>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Precio ($)</label>
          <input
            style={styles.input}
            type="number"
            placeholder="0.00"
            min="0"
            value={form.price}
            onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Stock</label>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            min="0"
            value={form.stock}
            onChange={e => setForm(prev => ({ ...prev, stock: e.target.value }))}
          />
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Categoría</label>
          <select
            style={styles.select}
            value={form.category}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
          >
            {categorias.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </div>
        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label style={styles.label}>Imagen</label>
          <div style={styles.imageUploadRow}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={isEdit ? editFileInputRef : fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              style={styles.btnUpload}
              onClick={() => (isEdit ? editFileInputRef : fileInputRef).current.click()}
            >
              <ImagePlus size={16} />
              {form.imagenPreview ? 'Cambiar' : 'Subir imagen'}
            </button>
            {form.imagenPreview && (
              <img src={form.imagenPreview} alt="preview" style={styles.imagePreview} />
            )}
          </div>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Descripción</label>
        <textarea
          style={styles.textarea}
          placeholder="Describe el producto..."
          value={form.description}
          onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </>
  );
}

function AdminProducts({ products = [], setProducts }) {
  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Todas las categorías');
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const filtered = products.filter(p => {
    const titleMatch = (p.title || '').toLowerCase().includes(search.toLowerCase());
    const descMatch = (p.description || '').toLowerCase().includes(search.toLowerCase());
    const matchSearch = titleMatch || descMatch;
    const matchFiltro = filtro === 'Todas las categorías' || p.category === categorySlugs[filtro];
    return matchSearch && matchFiltro;
  });

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validar formato
  const formatosPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
  if (!formatosPermitidos.includes(file.type)) {
    alert('Solo se permiten imágenes JPG, PNG o WebP');
    return;
  }

  // Validar tamaño (2MB máximo)
  const tamanioMaximo = 2 * 1024 * 1024;
  if (file.size > tamanioMaximo) {
    alert('La imagen no puede superar 2MB');
    return;
  }

  // Mostrar preview inmediatamente
  const reader = new FileReader();
  reader.onload = (ev) => {
    setForm(prev => ({ ...prev, imagenPreview: ev.target.result }));
  };
  reader.readAsDataURL(file);

  // Subir a Supabase Storage
  try {
    const extension = file.name.split('.').pop();
    const fileName = `producto-${Math.random().toString(36).substring(2, 9)}.${extension}`;

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Log temporal para ver la URL exacta
console.log('URL completa:', `${SUPABASE_URL}/storage/v1/object/products/${fileName}`);
console.log('Key disponible:', !!SUPABASE_KEY);

    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/products/${fileName}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apikey': SUPABASE_KEY,
          'Content-Type': file.type,
        },
        body: file
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error('Error subiendo imagen:', errText);
      alert('Error al subir la imagen');
      return;
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;

    setForm(prev => ({
      ...prev,
      imagen: file,
      imagenPreview: publicUrl,
      imageUrl: publicUrl
    }));

    console.log('Imagen subida:', publicUrl);

  } catch (error) {
    console.error('Error:', error);
    alert('Error al subir la imagen');
  }
};

  const handleCreate = async () => {
  if (!form.title.trim() || !form.price || !form.stock || !form.description.trim()) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }
  if (parseFloat(form.price) < 0 || parseInt(form.stock) < 0) {
    alert('No se permiten cantidades negativas.');
    return;
  }

  const stockVal = parseInt(form.stock) || 0;
  const nuevoProducto = {
    title:       form.title,
    description: form.description,
    category:    form.category,
    price:       parseFloat(form.price) || 0,
    isSoldOut:   stockVal <= 0,
    image:       form.imageUrl || form.imagenPreview || 'https://images.unsplash.com/photo-1735553817396-510cfe7066e6?w=100'
  };

  try {
    const res = await fetch('http://localhost:3001/api/productos', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(nuevoProducto)
    });
    const productoCreado = await res.json();
    setProducts(prev => [...prev, productoCreado]);
    setForm(emptyForm);
    setShowNew(false);
  } catch (error) {
    console.error('Error creando producto:', error);
    alert('Error al crear el producto');
  }
};

  const handleEdit = (product) => {
    setEditId(product.id);
    const stockVal = product.stock !== undefined ? product.stock : (product.isSoldOut ? 0 : 10);
    setForm({
      title: product.title || '',
      price: product.price || '',
      stock: stockVal,
      category: product.category || 'ropa-mujer',
      description: product.description || '',
      imagen: null,
      imagenPreview: product.image || '',
    });
    setShowEdit(true);
  };

  const handleUpdate = async () => {
  if (!form.title.trim() || !form.price || !form.stock || !form.description.trim()) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  const stockVal = parseInt(form.stock) || 0;
  const productoActualizado = {
    title:       form.title,
    description: form.description,
    category:    form.category,
    price:       parseFloat(form.price) || 0,
    isSoldOut:   stockVal <= 0,
    image:       form.imageUrl || form.imagenPreview || ''
  };

  try {
    const res = await fetch(`http://localhost:3001/api/productos/${editId}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(productoActualizado)
    });
    const productoEditado = await res.json();
    setProducts(prev => prev.map(p => String(p.id) === String(editId) ? productoEditado : p));
    setForm(emptyForm);
    setShowEdit(false);
    setEditId(null);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    alert('Error al actualizar el producto');
  }
};

  const handleDelete = async (id) => {
  if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

  try {
    await fetch(`http://localhost:3001/api/productos/${id}`, {
      method: 'DELETE'
    });
    setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
  } catch (error) {
    console.error('Error eliminando producto:', error);
    alert('Error al eliminar el producto');
  }
};

  return (
    <div style={styles.page}>
      <AdminHeader />
      <AdminTabs activeTab="productos" />

      <main style={styles.content}>
        {/* Title */}
        <div style={styles.titleRow}>
          <div style={styles.titleLeft}>
            <Box size={22} color="#e08c00" />
            <div>
              <h2 style={styles.title}>Gestión de Productos</h2>
              <p style={styles.subtitle}>Administra el catálogo de productos de tu tienda</p>
            </div>
          </div>
          <button style={styles.btnNew} onClick={() => { setForm(emptyForm); setShowNew(true); }}>
            <Plus size={16} /> Nuevo Producto
          </button>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ ...styles.searchBox, flex: 1 }}>
            <Search size={16} color="#aaa" />
            <input
              style={styles.searchInput}
              placeholder="Buscar productos por nombre o descripción..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.filtroWrapper}>
            <button style={styles.filtroBtn} onClick={() => setFiltroOpen(!filtroOpen)}>
              <Filter size={14} /> {filtro} <ChevronDown size={14} />
            </button>
            {filtroOpen && (
              <div style={styles.filtroMenu}>
                {['Todas las categorías', ...categorias.map(c => c.label)].map(op => (
                  <div key={op} style={styles.filtroItem} onClick={() => { setFiltro(op); setFiltroOpen(false); }}>
                    {op}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products List */}
        <div style={styles.card}>
          {filtered.map((product, i) => {
            const displayCategory = categoryLabels[product.category] || product.category;
            const displayColor = categoryColors[product.category] || categoryColors['ropa-mujer'];
            const productStock = product.stock !== undefined ? product.stock : (product.isSoldOut ? 0 : 10);
            return (
              <div key={product.id} style={{ ...styles.productRow, borderBottom: i < filtered.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <img src={product.image} alt={product.title} style={styles.productImg} onError={e => e.target.src = 'https://via.placeholder.com/80'} />
                <div style={styles.productInfo}>
                  <div style={styles.productName}>{product.title}</div>
                  <div style={styles.productDesc}>{product.description}</div>
                  <div style={styles.productTags}>
                    <span style={{ ...styles.categoryBadge, ...displayColor }}>{displayCategory}</span>
                    <span style={{ ...styles.stockBadge, ...(productStock < 5 ? styles.stockLow : styles.stockOk) }}>
                      Stock: {productStock}
                    </span>
                  </div>
                </div>
                <div style={styles.productPrice}>${parseFloat(product.price).toFixed(2)}</div>
                <div style={styles.productActions}>
                  <button style={styles.btnEdit} onClick={() => handleEdit(product)}>
                    <Pencil size={15} />
                  </button>
                  <button style={styles.btnDelete} onClick={() => handleDelete(product.id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Nuevo Producto */}
      {showNew && (
        <div style={styles.overlay} onClick={() => setShowNew(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setShowNew(false)}><X size={18} /></button>
            <h2 style={styles.modalTitle}>Nuevo Producto</h2>
            <p style={styles.modalSubtitle}>Completa los datos para crear un nuevo producto</p>
            <hr style={styles.divider} />
            <FormContent
              form={form}
              setForm={setForm}
              isEdit={false}
              fileInputRef={fileInputRef}
              editFileInputRef={editFileInputRef}
              handleImageChange={handleImageChange}
            />
            <div style={styles.modalActions}>
              <button style={styles.btnCreate} onClick={handleCreate}>Crear Producto</button>
              <button style={styles.btnCancel} onClick={() => setShowNew(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Producto */}
      {showEdit && (
        <div style={styles.overlay} onClick={() => setShowEdit(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setShowEdit(false)}><X size={18} /></button>
            <h2 style={styles.modalTitle}>Editar Producto</h2>
            <p style={styles.modalSubtitle}>Modifica la información del producto</p>
            <hr style={styles.divider} />
            <FormContent
              form={form}
              setForm={setForm}
              isEdit={true}
              fileInputRef={fileInputRef}
              editFileInputRef={editFileInputRef}
              handleImageChange={handleImageChange}
            />
            <div style={styles.modalActions}>
              <button style={styles.btnCreate} onClick={handleUpdate}>Actualizar Producto</button>
              <button style={styles.btnCancel} onClick={() => setShowEdit(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: "'Segoe UI', sans-serif",
  },
  content: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  titleLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  subtitle: {
    fontSize: '13px',
    color: '#888',
    margin: '4px 0 0',
  },
  btnNew: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    padding: '10px 16px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#333',
    width: '100%',
    background: 'transparent',
  },
  filtroWrapper: {
    position: 'relative',
  },
  filtroBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  filtroMenu: {
    position: 'absolute',
    top: '44px',
    right: 0,
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    overflow: 'hidden',
    zIndex: 10,
    minWidth: '160px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
  filtroItem: {
    padding: '10px 16px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  productImg: {
    width: '72px',
    height: '72px',
    borderRadius: '10px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  productInfo: {
    flex: 1,
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  productName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  productDesc: {
    fontSize: '13px',
    color: '#888',
  },
  productTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  categoryBadge: {
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  stockBadge: {
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  stockOk: {
    background: '#dcfce7',
    color: '#16a34a',
  },
  stockLow: {
    background: '#fee2e2',
    color: '#dc2626',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#e08c00',
    whiteSpace: 'nowrap',
  },
  productActions: {
    display: 'flex',
    gap: '8px',
  },
  btnEdit: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1.5px solid #e8e8e8',
    background: 'transparent',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  btnDelete: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1.5px solid #fca5a5',
    background: 'transparent',
    color: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '16px',
  },
  modal: {
    background: '#fff',
    borderRadius: '20px',
    padding: '32px',
    width: '100%',
    maxWidth: '560px',
    position: 'relative',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 4px',
  },
  modalSubtitle: {
    fontSize: '13px',
    color: '#888',
    margin: 0,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #f0f0f0',
    margin: '16px 0',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '12px',
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e8e8e8',
    background: '#f9f9f9',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e8e8e8',
    background: '#f9f9f9',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  textarea: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e8e8e8',
    background: '#f9f9f9',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: "'Segoe UI', sans-serif",
  },
  imageUploadRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  btnUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 14px',
    background: '#f5f5f5',
    border: '1.5px dashed #ccc',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#555',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  imagePreview: {
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1.5px solid #e8e8e8',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  btnCreate: {
    flex: 1,
    padding: '12px',
    background: '#111',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
  },
  btnCancel: {
    flex: 1,
    padding: '12px',
    background: 'transparent',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    cursor: 'pointer',
  },
};

export default AdminProducts;