const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

exports.createInvoiceWithProducts = async (req, res) => {
    const { number, date, items } = req.body;
  
    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'La factura debe incluir al menos un producto.' });
      }
  
      const productPromises = items.map(async (item) => {
        const product = new Product({
          productName: item.productName,
          price: item.price,
          description: item.description || '',
          valor: item.valor,
          poliza: item.poliza,
          fecha_entrada: item.fecha_entrada,
          fecha_salida: item.fecha_salida,
          cantidad: item.cantidad,
          serial: item.serial,
          marca: item.marca,
          referencia: item.referencia,
          equipo: item.equipo,
          observacion: item.observacion,
          factura: number,  
        });
        await product.save();
        return { product: product._id, quantity: item.quantity, price: item.price };
      });
  
      const productsWithIds = await Promise.all(productPromises);
  
      const invoice = new Invoice({
        number,
        date,
        items: productsWithIds,
      });
  
      await invoice.save();
  
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createInvoice = async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.status(200).json({ message: 'Factura eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('items.product') 
            .exec();
        
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};