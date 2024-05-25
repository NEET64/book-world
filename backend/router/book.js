const express = require("express");
const bookController = require("../controller/books.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

const multer = require("multer");
const { authorization } = require("../middleware.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/thumbnail");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(wrapAsync(bookController.getAllBooks))
  .post(
    authorization,
    upload.single("image"),
    wrapAsync(bookController.createBook)
  );

router.get("/genre", (req, res) => {
  res.json({
    genre: [
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Romance",
      "Historical Fiction",
      "Non-Fiction",
      "Adventure",
    ],
  });
});

router
  .route("/:id")
  .get(wrapAsync(bookController.getBook))
  .put(
    authorization,
    upload.single("image"),
    wrapAsync(bookController.updateBook)
  )
  .delete(authorization, wrapAsync(bookController.deleteBook));

module.exports = router;
