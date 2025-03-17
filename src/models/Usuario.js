const mongoose = require('mongoose');

// Subesquema para direcciones
const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true }
});

// Esquema principal para usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number },
  fecha_creacion: { type: Date, default: Date.now },
  direcciones: {
    type: [direccionSchema],
    validate: {
      validator: function (value) {
        // Validar que el array no esté vacío y que todos los elementos sean objetos válidos
        return Array.isArray(value) && value.length > 0 && value.every(direccion => {
          return direccion.calle && direccion.ciudad && direccion.pais && direccion.codigo_postal;
        });
      },
      message: 'El campo direcciones debe ser un array con al menos un objeto válido.'
    }
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);