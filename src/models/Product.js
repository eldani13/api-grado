const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: false },
  price: { type: Number, required: false },
  description: { type: String, required: false },
  valor: { type: Number, required: false },
  poliza: { type: String, required: false },
  fecha_entrada: { type: Date, required: false },
  fecha_salida: { type: Date, required: false },
  cantidad: { type: Number, required: false },
  serial: { type: String, required: false },
  marca: { type: String, required: false },
  referencia: { type: String, required: false },
  equipo: { type: String, required: false },
  observacion: {type: String, required: false},
  factura: { type: String, required: false } 
});

module.exports = mongoose.model('Product', productSchema);
