const mongoose = require('mongoose');


const purchaseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: false },
});

module.exports = mongoose.model('Purchase', purchaseSchema);