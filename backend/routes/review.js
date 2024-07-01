const express = require('express');
const router = express.Router();
const auth = require('../auth_middleware/auth');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.post('/', auth, createReview);
router.get('/', getAllReviews);
router.get('/:review_id', getReviewById);
router.put('/:review_id', auth, updateReview);
router.delete('/:review_id', auth, deleteReview);

module.exports = router;
