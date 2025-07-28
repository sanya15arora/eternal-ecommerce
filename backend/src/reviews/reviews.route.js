const express = require('express');
const router = express.Router();
const Reviews = require('./reviews.model.js');
const Products = require('../products/products.model.js');


//Post a review
router.post('/post-review', async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;


        if (!comment || !rating || !userId || !productId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const existingReview = await Reviews.findOne({ userId, productId });
        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
            existingReview.createdAt = new Date();
            await existingReview.save();
        }
        else {
            await Reviews.create({
                userId,
                productId,
                rating,
                comment
            });
        }

        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const product = await Products.findById(productId);
            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false });
            }
            else {
                return res.status(404).send({
                    message: 'Product not found'
                });
            }
        }
        res.status(200).send({
            message: 'Review posted successfully',
            reviews: reviews
        });


    } catch (error) {
        console.error('Error posting review:', error);
        res.status(500).json({
            message: 'Failed to post review',
            error: error.message
        });
    }
});

// Total reviews count
router.get('/total-reviews-count', async (req, res) => {
    try {
        const totalCount = await Reviews.countDocuments({});
        res.status(200).json({
            totalCount
        });
    } catch (error) {
        console.error('Error fetching Total reviews count:', error);
        res.status(500).json({
            message: 'Failed to fetch Total reviews count',
            error: error.message
        });
    }
});

// Get reviews by user ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).send({
                message: 'User ID is required'
            });
        }
        const reviews = await Reviews.find({ userId }).sort({ createdAt: -1 })
        if (reviews.length === 0) {
            return res.status(404).send({
                message: 'No reviews found for this user'
            });
        }
        res.status(200).send({
            reviews
        });
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).send({
            message: 'Failed to fetch user reviews',
            error: error.message
        });
    }
});




module.exports = router;