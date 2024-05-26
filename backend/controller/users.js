const ExpressError = require("../utils/ExpressErrors");
const bcrypt = require("bcryptjs");
const { SignJWT } = require("jose");
const User = require("../models/users");
const Book = require("../models/books");

// Signup route
module.exports.signup = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw new ExpressError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
};

// Login route
module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ExpressError(400, "Invalid email or password");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET;
  const secretBytes = new TextEncoder().encode(secret);
  const signer = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();
  const token = await signer.sign(secretBytes);

  res.status(200).json({
    token,
    role: user.role,
    message: `Welcome ${user.firstName}! to the Book World`,
  });
};

module.exports.getAllUsers = async (req, res) => {
  if (req.role !== "admin") {
    throw new ExpressError(401, "not Authorized");
  }
  const users = await User.find({}, "-password");

  res.json({
    users,
  });
};

module.exports.toggleFavouriteBook = async (req, res) => {
  const userId = req.userId;
  const { bookId } = req.body;

  if (!bookId) {
    throw new ExpressError(400, "Book ID is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ExpressError(404, "Book not found");
  }

  const isFavorite = user.favoriteBooks.includes(bookId);
  if (isFavorite) {
    user.favoriteBooks.pull(bookId);
  } else {
    user.favoriteBooks.push(bookId);
  }

  await user.save();

  const responseMessage = isFavorite
    ? "Book removed from favorites"
    : "Book added to favorites";

  res.status(200).json({
    message: responseMessage,
    book,
  });
};

module.exports.getFavouriteBooks = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId).populate("favoriteBooks");
  if (!user) {
    new ExpressError(404, "User not found");
  }

  res.status(201).json({
    books: user.favoriteBooks,
  });
};

module.exports.getMe = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId, "-password");
  if (!user) {
    new ExpressError(404, "User not found");
  }

  res.status(201).json({
    user,
  });
};
