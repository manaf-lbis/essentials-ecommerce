const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuid } = require('uuid');

const orderSchema = new Schema({
  orderId: {
    type: String,
    default: uuid(),
    unique: true,
  },
  orderItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    default: 0,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'processing', 'Shipped', 'Delivered'],
  },
  couponApplied: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
