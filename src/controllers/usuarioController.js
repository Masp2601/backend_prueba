const Usuario = require('../models/Usuario');

// Crear un usuario
exports.crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const usuarios = await Usuario.find()
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar usuarios por ciudad
exports.buscarUsuariosPorCiudad = async (req, res) => {
  try {
    const { ciudad } = req.query;
    if (!ciudad) return res.status(400).json({ message: 'Debe proporcionar una ciudad' });

    const usuarios = await Usuario.find({ 'direcciones.ciudad': ciudad });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};