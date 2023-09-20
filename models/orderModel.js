const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
    default: new Date(Date.now() + 1 + Math.floor(Math.random() * (25 - 5 + 1) + 10) * 60000),
  },
  eta: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: [true, 'A order must have a total price.'],
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'An order must belong to a product.'],
      },
      title: {
        type: String,
        required: [true, 'An product must have title.'],
      },
      price: {
        type: Number,
        required: [true, 'An product must have a price.'],
      },
      quantity: {
        type: Number,
        required: [true, 'An product must have a qauntity.'],
        min: 1,
        default: 1,
      },
      totalProductPrice: {
        type: Number,
        required: [true, 'A product must have a total price.'],
        min: 1,
      },
    },
  ],
});

orderSchema.pre('save', function (next) {
  this.products.forEach((product) => {
    product.totalProductPrice = product.price * product.quantity;
  });

  this.totalPrice = this.products.map((product) => {
    this.totalPrice += product.totalProductPrice;
  });

  this.eta = Math.floor((this.finishedAt - this.createdAt) / 60000);
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
