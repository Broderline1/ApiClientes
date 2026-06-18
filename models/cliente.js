const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  clave: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  fechaNacimiento: { type: String, required: true },
});

module.exports = mongoose.model("Cliente", clienteSchema);
