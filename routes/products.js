const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const manager = new ProductManager('./db/products.json');

router.get('/', async (req, res) => {
    const {limit} = req.query;
    if (limit) {
        const products = await manager.getProducts();
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
        return;
    }
    const products = await manager.getProducts();
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await manager.getProductById(id);
    res.send(product);
});

router.post('/', async (req, res) => {
    const product = req.body;
    const newProduct = await manager.addProduct(product);
    res.send(newProduct);
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const product = req.body;
    const updatedProduct = await manager.updateById(id, product);
    res.send(updatedProduct);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deletedProduct = await manager.deleteById(id);
    res.send(deletedProduct);
});

module.exports = router;