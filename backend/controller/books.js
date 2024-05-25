const Book = require("../models/books");
const ExpressError = require("../utils/ExpressErrors");

module.exports.getAllBooks = async (req, res) => {
  const { q } = req.query;

  let books;
  if (q) {
    const regex = new RegExp(q, "i");
    books = await Book.find({
      $or: [{ title: regex }, { author: regex }, { genre: { $in: [regex] } }],
    });
  } else {
    books = await Book.find({});
  }
  res.json({
    books: books,
  });
};

module.exports.getBook = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);

  res.json({
    book,
  });
};

module.exports.createBook = async (req, res) => {
  if (req.role !== "admin") {
    throw new ExpressError(401, "You are not Authorized to Add Book");
  }
  const body = req.body;

  const imagePath = `http://localhost:8000/public/thumbnail/${req.file.filename}`;
  body.image_url = imagePath;
  const book = new Book(body);

  await book.save();

  res.json({
    book,
    message: `${book.title} Added`,
  });
};

module.exports.deleteBook = async (req, res) => {
  if (req.role !== "admin") {
    throw new ExpressError(401, "You are not Authorized to Delete a Book");
  }
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id);
  res.json({
    book: book,
    message: "Deleted",
  });
};

module.exports.updateBook = async (req, res) => {
  if (req.role !== "admin") {
    throw new ExpressError(401, "You are not Authorized to Update a Book");
  }
  const id = req.params.id;
  const body = req.body;

  const previous = await Book.findById(id);
  if (req.file) {
    const imagePath = `http://localhost:8000/public/thumbnail/${req.file?.filename}`;
    body.image_url = imagePath;
  } else body.image_url = previous.image_url;

  const current = await Book.findByIdAndUpdate(id, body, { new: true });

  res.json({
    previous,
    current,
    message: "Updated",
  });
};
