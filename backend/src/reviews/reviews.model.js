const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Reviews = mongoose.model('Review', ReviewSchema);

module.exports = Reviews;
