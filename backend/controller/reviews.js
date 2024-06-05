const Review = require("../models/review");
const User = require("../models/users");
const ExpressError = require("../utils/ExpressErrors");
const { deleteCommentAndReplies } = require("./comments");

module.exports.getAllReviews = async (req, res) => {
  const bookId = req.params.id;

  const reviews = await Review.find({ bookId }).populate(
    "userId",
    "-password -favoriteBooks"
  );

  res.json({ reviews });
};

module.exports.getReview = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.userId;

  const review = await Review.findOne({ bookId: bookId, userId }).populate(
    "userId",
    "-password -favoriteBooks"
  );
  res.send(review);
};

module.exports.createReview = async (req, res) => {
  const bookId = req.params.id;
  const { content, rating } = req.body;
  const userId = req.userId;

  const review = new Review({ bookId, content, rating, userId });
  await review.save();

  res.json({ review, message: "Reveiw Created" });
};

module.exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { content, rating } = req.body;
  const userId = req.userId;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ExpressError(400, "Review not found");
  }

  if (review.userId != userId) {
    throw new ExpressError(403, "Unauthorized to update this review");
  }

  review.content = content || review.content;
  review.rating = rating || review.rating;

  await review.save();

  res.json({ review, message: "Review Updated" });
};

module.exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ExpressError(400, "Review not found");
  }

  if (
    !req.userId ||
    !(req.role === "admin" || req.userId == review.userId._id)
  ) {
    throw new ExpressError(403, "Unauthorized to delete Review");
  }
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    throw new ExpressError(400, "Review not found");
  }
  const replies = review.comments;
  for (const replyId of replies) {
    await deleteCommentAndReplies(replyId);
  }

  res.json({ message: "Review Deleted" });
};

module.exports.likeReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.userId;

  const user = await User.findById(userId);
  const isLiked = user.likedReviews.includes(reviewId);

  if (isLiked) {
    const review = await Review.findByIdAndUpdate(reviewId, {
      $inc: { likes: -1 },
      $pull: { likedBy: userId },
    });

    if (!review) {
      throw new ExpressError(404, "Review not found");
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { likedReviews: reviewId },
      });
    }

    return res.json({ message: "Review unliked successfully" });
  }
  const review = await Review.findByIdAndUpdate(reviewId, {
    $inc: { likes: 1 },
    $addToSet: { likedBy: userId },
  });

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  if (userId) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedReviews: reviewId },
    });
  }
  res.json({ message: "Review liked successfully" });
};
