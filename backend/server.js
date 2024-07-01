require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const scrapeAndStoreBooks = require('./scraper');

connectDB();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/books', require('./routes/book'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  
  scrapeAndStoreBooks();

  setInterval(scrapeAndStoreBooks, 48 * 60 * 60 * 1000); 
});
