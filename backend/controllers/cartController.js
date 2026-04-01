const User = require("../models/User");

// ADD TO CART
exports.addToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;

        const user = await User.findById(req.user._id);

        const itemExists = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (itemExists) {
            itemExists.qty += qty;
        } else {
            user.cart.push({ product: productId, qty });
        }

        await user.save();

        const updatedUser = await User.findById(req.user._id).populate("cart.product");

        res.json(updatedUser.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET CART
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.product");
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.cart = user.cart.filter(
            (item) => item.product.toString() !== req.params.productId
        );

        await user.save();

        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};