const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  number: { type: String, required: false },
  date: { type: Date, required: false },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
      quantity: { type: Number, required: false },
      price: { type: Number, required: false }
    }
  ]
});

module.exports = mongoose.model('Invoice', invoiceSchema);
