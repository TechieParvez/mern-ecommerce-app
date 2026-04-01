const Order = require("../models/Order");
const User = require("../models/User");

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        const user = await User.findById(req.user._id).populate("cart.product");

        if (user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Convert cart to order items
        const orderItems = user.cart.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            qty: item.qty,
            price: item.product.price,
        }));

        // Calculate total
        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.qty * item.price,
            0
        );

        const order = new Order({
            user: user._id,
            orderItems,
            shippingAddress,
            totalPrice,
        });

        const createdOrder = await order.save();

        // Clear cart
        user.cart = [];
        await user.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// MARK AS PAID
exports.markAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// MARK AS DELIVERED
exports.markAsDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};