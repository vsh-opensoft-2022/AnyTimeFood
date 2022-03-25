const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    dateTime: {
      type: String,
      required: [true, 'Date and time must be provided'],
    },
    items: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: [true, 'A order must have a total price']
    },
    status: {
      type: Number,
      enum: {
        values: ['1', '-1', '0'],
        message: 'Order is either: delievered(1), not delievered(-1), in transit(0)'
      },
      required: [true, 'A order must have a status']
    },
    feedback: {
      type: String,
      required: false,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    address: {
      type: String,
      required: [true, 'Address must be provided'],
    }
  }
);

const Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;