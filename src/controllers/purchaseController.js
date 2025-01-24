const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};