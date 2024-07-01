const express = require('express');
const router = express.Router();
const auth = require('../auth_middleware/auth');
const {
  getAllBooks,
  getBookById,
} = require('../controllers/bookController');

// Routes
router.get('/', getAllBooks);
router.get('/:book_id', getBookById);

module.exports = router;
