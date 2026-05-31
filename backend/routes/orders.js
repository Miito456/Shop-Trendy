const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET — obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM orders ORDER BY date DESC'
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener órdenes:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET — estadísticas para el dashboard
router.get('/stats', async (req, res) => {
  try {
    const ingresos = await pool.query(
      "SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status = 'Completado'"
    );
    const pedidos = await pool.query('SELECT COUNT(*) as total FROM orders');
    const products = await pool.query('SELECT COUNT(*) as total FROM products');
    const usuarios = await pool.query('SELECT COUNT(*) as total FROM users');
    const recientes = await pool.query('SELECT * FROM orders ORDER BY date DESC LIMIT 5');
    const ultimosProductos = await pool.query('SELECT * FROM products ORDER BY id DESC LIMIT 5');

    res.json({
      ingresos:         parseFloat(ingresos.rows[0].total),
      pedidos:          parseInt(pedidos.rows[0].total),
      productos:        parseInt(products.rows[0].total),
      usuarios:         parseInt(usuarios.rows[0].total),
      recientes:        recientes.rows,
      ultimosProductos: ultimosProductos.rows.map(p => ({
        ...p,
        price: parseFloat(p.price)
      }))
    });
  } catch (error) {
    console.error('Error al obtener stats:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// GET — obtener órdenes de un usuario específico
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const resultado = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener órdenes del usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST — crear nueva orden
router.post('/', async (req, res) => {
  try {
    const { user_id, customer_name, customer_email, total, status, shipping_address, products } = req.body;

    const resultado = await pool.query(
      `INSERT INTO orders (user_id, customer_name, customer_email, total, status, shipping_address, products)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, customer_name, customer_email, total, status || 'Pendiente', shipping_address, JSON.stringify(products)]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear orden:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT — actualizar status de una orden
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const resultado = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar orden:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;