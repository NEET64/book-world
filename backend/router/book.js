const express = require("express");
const bookController = require("../controller/books.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const { authorization } = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");

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
