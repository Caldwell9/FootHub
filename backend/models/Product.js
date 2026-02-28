const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  category: {
    type: String,
    enum: ['Sneakers', 'Sports', 'Casual', 'Formal'],
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300x300?text=Shoe+Image',
  },
  sizes: [Number],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);