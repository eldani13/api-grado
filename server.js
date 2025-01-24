const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./src/config/database');

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));

const purchaseRoutes = require('./src/routes/purchaseRoutes');
const invoiceRoutes = require('./src/routes/invoiceRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use('/api/purchases', purchaseRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
