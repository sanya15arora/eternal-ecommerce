const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  amount: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: { type: String, required: true, trim: true },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'completed'],
    default: 'pending'
  },
}, { timestamps: true });

const Orders = mongoose.model('Order', OrderSchema);

module.exports = Orders;