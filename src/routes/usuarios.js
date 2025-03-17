const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);

// Rutas específicas
router.get('/buscar', usuarioController.buscarUsuariosPorCiudad);

// Rutas dinámicas
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;