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

// PUT — actualizar status del usuario
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const resultado = await pool.query(
      'UPDATE users SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;