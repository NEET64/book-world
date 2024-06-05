const express = require("express");
const bookController = require("../controller/books.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const { authorization } = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  likeReview,
  getReview,
} = require("../controller/reviews.js");
const {
  getComments,
  createComment,
  createNestedComment,
  deleteComment,
  getNestedComments,
  likeComment,
} = require("../controller/comments.js");

router
  .route("/")
  .get(wrapAsync(bookController.getAllBooks))
  .post(
    authorization,
    upload.single("image"),
    wrapAsync(bookController.createBook)
  );

router
  .route("/:id")
  .get(wrapAsync(bookController.getBook))
  .put(
    authorization,
    upload.single("image"),
    wrapAsync(bookController.updateBook)
  )
  .delete(authorization, wrapAsync(bookController.deleteBook));

router
  .route("/:id/reviews")
  .get(wrapAsync(getAllReviews))
  .post(authorization, wrapAsync(createReview));

router.route("/:id/reviews/me").get(authorization, wrapAsync(getReview));

router
  .route("/:id/reviews/:reviewId/like")
  .post(authorization, wrapAsync(likeReview));

router
  .route("/:id/reviews/:reviewId/comments/:commentId/like")
  .post(authorization, wrapAsync(likeComment));

router
  .route("/:id/reviews/:reviewId")
  .put(authorization, wrapAsync(updateReview))
  .delete(authorization, wrapAsync(deleteReview));

router
  .route("/:bookId/reviews/:reviewId/comments")
  .get(wrapAsync(getComments))
  .post(authorization, wrapAsync(createComment));

router
  .route("/:bookId/reviews/:reviewId/comments/:commentId")
  .get(wrapAsync(getNestedComments))
  .post(authorization, wrapAsync(createNestedComment))
  .delete(authorization, wrapAsync(deleteComment));

module.exports = router;
