const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min:[1]
      },
      addedOn: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
