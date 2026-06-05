const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const VALID_STATUSES = new Set(['Activo', 'Inactivo']);

// GET — obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT 
        u.*,
        COUNT(o.id)::integer as total_orders,
        COALESCE(SUM(o.total), 0)::numeric as total_spent
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
      GROUP BY u.id
      ORDER BY u.registration_date DESC
    `);
    res.json(resultado.rows.map(user => ({
      ...user,
      status: user.status || 'Activo'
    })));
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// GET — obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      `SELECT 
        u.*,
        COALESCE(u.status, 'Activo') as status
       FROM users u
       WHERE u.id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT — actualizar status del usuario
// PUT — actualizar perfil del usuario
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.has(status)) {
      return res.status(400).json({ error: 'Status de usuario no valido' });
    }

    const resultado = await pool.query(
      `UPDATE users
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar status:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;

    const resultado = await pool.query(
      `UPDATE users 
       SET name = $1, phone = $2, address = $3
       WHERE id = $4
       RETURNING *`,
      [name, phone, address, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar perfil:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
