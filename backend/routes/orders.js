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

// POST — crear nueva orden y descontar stock
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, customer_name, customer_email, total, status, shipping_address, products } = req.body;

    await client.query('BEGIN');

    // PASO 1: Verificar que todos los productos tengan stock disponible
    for (const item of products) {
      let productoRes;
      if (item.id) {
        productoRes = await client.query(
          'SELECT id, stock, "isSoldOut", title FROM products WHERE id = $1 FOR UPDATE',
          [item.id]
        );
      } else {
        productoRes = await client.query(
          'SELECT id, stock, "isSoldOut", title FROM products WHERE title = $1 FOR UPDATE',
          [item.name]
        );
      }

      if (productoRes.rows.length === 0) continue;

      const producto = productoRes.rows[0];
      // Si el producto está agotado o sin stock, cancelar toda la orden
      if (producto.isSoldOut || parseInt(producto.stock) <= 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          error: `El producto "${producto.title}" ya no tiene stock disponible. Por favor, retíralo del carrito.`
        });
      }
    }

    // PASO 2: Descontar stock de cada producto (stock máximo es 1, pasa a 0)
    for (const item of products) {
      let productoRes;
      if (item.id) {
        productoRes = await client.query(
          'SELECT id, stock FROM products WHERE id = $1',
          [item.id]
        );
      } else {
        productoRes = await client.query(
          'SELECT id, stock FROM products WHERE title = $1',
          [item.name]
        );
      }

      if (productoRes.rows.length === 0) continue;

      const producto = productoRes.rows[0];
      const nuevoStock = Math.max(0, (parseInt(producto.stock) || 0) - (item.quantity || 1)); // Descuenta cantidad
      const isSoldOut = nuevoStock <= 0;

      await client.query(
        'UPDATE products SET stock = $1, "isSoldOut" = $2 WHERE id = $3',
        [nuevoStock, isSoldOut, producto.id]
      );
    }

    // PASO 3: Crear la orden
    const resultado = await client.query(
      `INSERT INTO orders (user_id, customer_name, customer_email, total, status, shipping_address, products)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, customer_name, customer_email, total, status || 'Pendiente', shipping_address, JSON.stringify(products)]
    );

    await client.query('COMMIT');

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear orden:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
});

// PUT — actualizar status de una orden (si se cancela, restaura stock)
router.put('/:id/status', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { status } = req.body;

    await client.query('BEGIN');

    // Obtener la orden actual para saber el status previo y los productos
    const ordenActual = await client.query(
      'SELECT status, products FROM orders WHERE id = $1',
      [id]
    );

    if (ordenActual.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    const ordenAnterior = ordenActual.rows[0];

    // Si se está cancelando una orden que NO estaba ya cancelada, restaurar stock
    if (status === 'Cancelado' && ordenAnterior.status !== 'Cancelado') {
      const productos = typeof ordenAnterior.products === 'string'
        ? JSON.parse(ordenAnterior.products)
        : ordenAnterior.products;

      if (Array.isArray(productos)) {
        for (const item of productos) {
          if (item.id) {
            // Restaurar stock a 1 y marcar como disponible
            await client.query(
              'UPDATE products SET stock = 1, "isSoldOut" = false WHERE id = $1',
              [item.id]
            );
          } else if (item.name) {
            // Restaurar por nombre si no hay id
            await client.query(
              'UPDATE products SET stock = 1, "isSoldOut" = false WHERE title = $1',
              [item.name]
            );
          }
        }
      }
    }

    const resultado = await client.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    await client.query('COMMIT');

    res.json(resultado.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al actualizar orden:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
});

module.exports = router;