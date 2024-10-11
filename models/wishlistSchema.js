const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      addedOn:{
        type:Date,
        default:Date.now
      }
    },
  ]

});


const whishlist = mongoose.model('Wishlist',wishlistSchema);
module.exports = whishlist;