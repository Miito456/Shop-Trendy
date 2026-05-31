const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ¿Qué son los middlewares?
// Son funciones que procesan cada petición ANTES de que llegue a tus rutas.
// Piénsalos como filtros o puertas de seguridad.

app.use(cors());          // Permite que React (puerto 3000) hable con este servidor (puerto 3001)
app.use(express.json()); // Permite leer datos JSON que envíe el frontend

// Rutas
const productosRouter = require('./routes/products');
app.use('/api/productos', productosRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Ruta de prueba — para verificar que el servidor vive
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor de Shop-Trendy funcionando' });
});

const pool = require('./db/pool');

// Probar que la base de datos responde
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
  } else {
    console.log('Base de datos conectada correctamente:', result.rows[0].now);
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

