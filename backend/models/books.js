const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: String,
  image: String,
  author: {
    type: String,
    required: true,
    minlength: 3,
  },
  image_url: String,
  genre: {
    type: [String],
    enum: [
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Romance",
      "Historical Fiction",
      "Non-Fiction",
      "Adventure",
    ],
    required: true,
  },
  year_published: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
