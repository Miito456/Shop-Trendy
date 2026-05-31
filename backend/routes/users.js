const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET — obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM users ORDER BY registration_date DESC'
    );
    res.json(resultado.rows);
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
      'SELECT * FROM users WHERE id = $1',
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