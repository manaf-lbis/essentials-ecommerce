const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: [
    {
      fullName: {
        type: String,
        required: true,
      },
      houseName: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      towm: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
    },
  ],
});

const Address = mongoose.model('Address',addressSchema);
module.exports = Address;