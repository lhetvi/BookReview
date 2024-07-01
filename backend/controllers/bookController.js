const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  try {
    const books = await Book.find()
      .skip((page - 1) * size)
      .limit(parseInt(size));

    res.status(200).json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookById = async (req, res) => {
  const { book_id } = req.params;

  try {
    const book = await Book.findById(book_id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
