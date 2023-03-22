const fs = require('fs');

class CartManager {

    constructor(path) {
        this.path = path;
    }

    setId = async () => {
        try {
            let data = await this.getProducts().then((data) => data);
            console.log(data);
            if (data === -1) {
                return 1;
            } else {
                let id = data[data.length - 1].id;
                const currentId = id + 1;
                return currentId;
            }
        } catch (error) {
            return error;
        }
    };

    createCart = async () => {
        const cart = {
            products: []
        }
            cart.id = this.setId();
            try {
                if (cart.id === 1) {
                    await fs.promises.writeFile(this.path, JSON.stringify([cart], null, 2));
                } else {
                    let carts = await this.getCarts().then((data) => data);
                    carts.push(cart);
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                    return 'Cart added successfully';
                }
            } catch (error) {
                return error;
            }
    }

    getCarts = async () => {

        if (!fs.existsSync(this.path)) {
            return -1;
        }
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            return error;
        }
    }

    addProductToCart = async (cartId, productId) => {
        const quantity = 1;

        try {
            let carts = await this.getCarts().then((data) => data);
            let cart = carts.find((cart) => cart.id === cartId);
            if (cart) {
                const product = {productId, quantity}
                const productExists = cart.products.find((product) => product.productId === productId);
                if (productExists) {
                    const index = cart.products.indexOf(productExists);
                    cart.products[index].quantity += quantity;
                } else {
                    cart.products.push(product);
                }

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                return 'Product added to cart successfully';
            }
            return 'Cart not found';
        } catch (error) {
            return error;
        }
    }

    getCartById = async (id) => {
        try {
            let data = await this.getCarts().then((data) => data);
            if (data !== -1) {
                let cart = data.find((cart) => cart.id === id);
                return cart ? cart : 'Cart not found';
            }
            return -1;
        } catch (error) {
            return error;
        }
    }
}

module.exports = CartManager;