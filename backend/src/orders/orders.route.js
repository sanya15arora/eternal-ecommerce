const express = require('express');
const router = express.Router();
const Orders = require('./orders.model');
const Product = require('../products/products.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
    const { products, userId, email, taxRate } = req.body;

    try {
        const lineItems = products.map(product => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.image],
                    metadata: {
                        productId: product._id,
                    },
                },
                unit_amount: Math.round((product.price + (product.price * taxRate)) * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            client_reference_id: userId,
            customer_email: email,
            payment_intent_data: {
                metadata: {
                    userId,
                    email,
                    taxRate: taxRate?.toString() || '0'
                },
            },
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe session error:', error.message);
        res.status(500).json({ message: 'Could not create checkout session' });
    }
});

// Confirm Payment
router.post('/confirm-payment', async (req, res) => {
    const { session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items.data.price.product', 'payment_intent'],
        });

        const paymentIntent = session.payment_intent;
        const orderId = paymentIntent.id;

        let order = await Orders.findOne({ orderId });

        const products = session.line_items.data.map(item => ({
            productId: item.price.product?.metadata?.productId || 'unknown',

            quantity: item.quantity,
        }));

        const orderData = {
            orderId,
            products,
            amount: session.amount_total / 100,
            userId: session.client_reference_id || paymentIntent.metadata?.userId,
            email: session.customer_email || paymentIntent.metadata?.email,
            status: paymentIntent.status === 'succeeded' ? 'pending' : 'failed',
            taxRate: parseFloat(paymentIntent.metadata?.taxRate || '0'),
        };

        if (!order) {
            order = new Orders(orderData);
        } else {
            order.status = orderData.status;
        }

        await order.save();
        res.json({ order });
    } catch (error) {
        console.error('Payment confirmation error:', error.message);
        res.status(500).json({ message: 'Could not confirm payment' });
    }
});

// Get Order by Email
router.get('/email/:email', async (req, res) => {
    const { email } = req.params;


    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const orders = await Orders.find({ email }).sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ orders: 0, message: 'No orders found for this email' });
        }
        res.status(200).send({ orders });
    } catch (error) {
        console.error('Error fetching orders by email:', error.message);
        res.status(500).json({ message: 'Error fetching orders by email' });
    }
});

// Get Order by Order ID
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        // Find order by ID
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'No order found with this ID.' });
        }

        const detailedProducts = await Promise.all(
            order.products.map(async (item) => {
                const product = await Product.findById(item.productId).select('name price image');
                return {
                    quantity: item.quantity,
                    _id: item._id,
                    productId: item.productId,
                    name: product?.name || 'Unknown Product',
                    price: product?.price || 0,
                    image: product?.image || '',
                };
            })
        );

        const enrichedOrder = {
            ...order.toObject(),
            products: detailedProducts
        };

        return res.status(200).json({ order: enrichedOrder });
    } catch (error) {
        console.error('Error fetching order by ID:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get All Orders (Admin)
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Orders.find().sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ orders: 0, message: 'No orders found' });
        }
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ message: 'Error fetching all orders' });
    }
});

// Update Order Status (Admin)
router.put('/update-status/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Order id is required' });
    }
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(id, {
            status,
            updatedAt: new Date()
        },
            {
                new: true,
                runValidators: true
            });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ message: 'Error updating order status' });
    }
});

// Delete Order (Admin)
router.delete('/delete/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Order id is required' });
    }
    try {
        const deletedOrder = await Orders.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ message: 'Failed to delete order' });
    }
});

module.exports = router;
