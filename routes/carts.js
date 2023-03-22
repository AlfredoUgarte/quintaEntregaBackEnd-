const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');

const manager = new CartManager('./db/carts.json');

router.get('/', async (req, res) => {
    const carts = await manager.getCarts();
    res.send(carts);
});

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = await manager.getCartById(id);
    res.send(cart);
});

router.post('/', async (req, res) => {
    const newCart = await manager.createCart();
    res.send(newCart);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const newCart = await manager.addProductToCart(cartId, productId);
    res.send(newCart);
});

module.exports = router;