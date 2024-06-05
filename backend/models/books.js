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
  image_url: {
    type: String,
    default:
      "https://res.cloudinary.com/dibsgcq9a/image/upload/v1716750907/book-world/sfx9lfhbj3pkxy0esxkk.jpg",
  },
  genre: {
    type: [String],
    required: true,
  },
  year_published: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
