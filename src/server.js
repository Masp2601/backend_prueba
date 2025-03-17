require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuarios');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/usuarios', usuarioRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});