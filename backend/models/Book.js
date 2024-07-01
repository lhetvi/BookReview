const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  isbn: {
    type: String,
    unique: true,
  },
  publishedDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
