const express = require('express');
const router = express.Router();
const Orders = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');
const Users = require('../users/user.model');
const Products = require('../products/products.model');

//User Stats by email
router.get('/user-stats/:email', async (req, res) => {
    const { email } = req.params
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const totalPaymentsResult = await Orders.aggregate([
            { $match: { email: email } },
            {
                $group: {
                    _id: null,
                    totalPayments: { $sum: '$amount' }
                }
            }
        ]);

        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalPayments : 0;
        const totalReviews = await Reviews.countDocuments({ userId: user._id });
        const purchasedProductsId = await Orders.find({ email: email }).distinct('products.productId');
        const totalPurchasedProducts = purchasedProductsId.length;

        const userStats = {
            totalPayments: totalPaymentsAmount.toFixed(2),
            totalReviews: totalReviews,
            totalPurchasedProducts: totalPurchasedProducts,
        };

        res.status(200).json(userStats);

    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ error: 'Error fetching user stats' });
    }


});

// Admin Stats
router.get('/admin-stats', async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments();
        const totalOrders = await Orders.countDocuments();
        const totalReviews = await Reviews.countDocuments();
        const totalProducts = await Products.countDocuments();

        const totalEarningsResult = await Orders.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: '$amount' }
                }
            }
        ]);
        const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings.toFixed(2) : 0;

        const monthlyEarningsResult = await Orders.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
                    monthlyEarnings: { $sum: '$amount' }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const monthlyEarnings = monthlyEarningsResult.map(entry => ({
            month: entry._id.month,
            year: entry._id.year,
            earnings: entry.monthlyEarnings.toFixed(2)
        }));


        const adminStats = {
            totalUsers,
            totalOrders,
            totalReviews,
            totalProducts,
            totalEarnings,
            monthlyEarnings
        };

        res.status(200).json(adminStats);

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ error: 'Error fetching admin stats' });
    }
});


module.exports = router;