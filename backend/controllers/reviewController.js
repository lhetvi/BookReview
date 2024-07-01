const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const newReview = new Review({
      book_id: req.body.book_id,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllReviews = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  try {
    const reviews = await Review.find()
      .populate('user', ['username'])
      .skip((page - 1) * size)
      .limit(parseInt(size));
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id).populate('user', ['username']);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    let review = await Review.findById(req.params.review_id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    review = await Review.findByIdAndUpdate(
      req.params.review_id,
      { $set: { rating, comment } },
      { new: true }
    );
    res.status(200).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await review.remove();
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
