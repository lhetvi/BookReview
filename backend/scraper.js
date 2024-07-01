const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('./models/Book');

const scrapeAndStoreBooks = async () => {
  try {
    const response = await axios.get('https://openlibrary.org/trending/daily');
    const html = response.data;
    const $ = cheerio.load(html);
    const books = [];
    
    $('.edition-item').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const author = $(element).find('.author').text().trim();
      const coverUrl = $(element).find('.cover').attr('src');
      const detailsUrl = $(element).find('.title a').attr('href');
      
      const book = {
        title,
        author,
        coverUrl,
        detailsUrl
      };
      
      books.push(book);
    });
    
    await Promise.all(books.map(async (book) => {
      const { title, author } = book;
      
      await Book.findOneAndUpdate(
        { title, author },
        { $set: book },
        { upsert: true, new: true }
      );
    }));
    
    console.log('Scraping and storing books completed.');
  } catch (error) {
    console.error('Error scraping books:', error.message);
  }
};

module.exports = scrapeAndStoreBooks;
