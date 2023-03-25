const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const manager = new ProductManager('./db/products.json');

router.get('/', async (req, res) => {
    res.render('realTimeProducts', {products: await manager.getProducts()});
});

module.exports = router;