const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/productos — obtener todos los productos
// Este endpoint responde cuando el frontend carga la tienda
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM products ORDER BY id ASC'
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/productos/:id — obtener un producto por su ID
// Este endpoint responde cuando el frontend abre el detalle de un producto
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/productos — crear un producto nuevo
// Este endpoint lo usa el panel de administrador
router.post('/', async (req, res) => {
  try {
    const { title, category, price, description, isSoldOut, image } = req.body;

    const resultado = await pool.query(
      `INSERT INTO products (title, category, price, description, "isSoldOut", image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, category, price, description, isSoldOut, image]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/productos/:id — actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, price, description, isSoldOut, image } = req.body;

    const resultado = await pool.query(
      `UPDATE products 
       SET title=$1, category=$2, price=$3, description=$4, "isSoldOut"=$5, image=$6
       WHERE id=$7
       RETURNING *`,
      [title, category, price, description, isSoldOut, image, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/productos/:id — eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;