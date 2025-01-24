const express = require('express');
const {
    createInvoice,
    createInvoiceWithProducts,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController');
const router = express.Router();

router.post('/with-products', createInvoiceWithProducts);

router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
