# BookReview

BookReview is a backend API for a book review platform with user authentication, review management, web scraping of book data, and a scheduling feature.

## Features

- **User Authentication:** Register, login, and JWT authentication.
- **Review Management:** Create, retrieve, update, delete book reviews.
- **Web Scraping:** Periodically updates book data from Open Library.
- **Scheduler:** Automates web scraping every 48 hours.

## Technologies

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing user data, reviews, and book information.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Axios**: HTTP client for making requests to external APIs.
- **Cheerio**: HTML parsing for web scraping.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/lhetvi/BookReview.git
   cd BookReview/backend

2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables:
Create a .env file in the root directory (backend/) and configure it:

   ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/bookreview

4. Start the server:

   ```bash
   npm start
