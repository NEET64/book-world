const Comment = require("../models/comments");
const Review = require("../models/review");
const User = require("../models/users");
const ExpressError = require("../utils/ExpressErrors");

module.exports.getComments = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId).populate({
    path: "comments",
    populate: { path: "userId", select: "-password -favoriteBooks" },
  });
  if (!review) {
    throw new ExpressError(400, "Review not found");
  }

  res.json({ comments: review.comments });
};

module.exports.getNestedComments = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId).populate({
    path: "replies",
    populate: { path: "userId", select: "-password -favoriteBooks" },
  });
  if (!comment) {
    throw new ExpressError(400, "Comment not found");
  }

  res.json({ comments: comment.replies });
};

module.exports.createComment = async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ExpressError(400, "Review not found");
  }

  const newComment = new Comment({ content, userId, reviewId });
  await newComment.save();

  review.comments.push(newComment);
  await review.save();

  res.status(201).json({ newComment, message: "Comment Created" });
};

module.exports.createNestedComment = async (req, res) => {
  const { reviewId, commentId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    throw new ExpressError(400, "Comment not found");
  }

  const reply = new Comment({
    content,
    userId,
    reviewId,
    parent: commentId,
  });
  await reply.save();

  parentComment.replies.push(reply);
  await parentComment.save();

  res.status(201).json({ reply, message: "Comment Created" });
};

module.exports.deleteCommentAndReplies = async (commentId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) {
    return;
  }

  const replies = comment.replies;
  for (const replyId of replies) {
    await this.deleteCommentAndReplies(replyId);
  }
};

module.exports.deleteComment = async (req, res) => {
  const { bookId, reviewId, commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ExpressError(400, "Comment not found");
  }

  if (
    !req.userId ||
    !(req.role === "admin" || req.userId == comment.userId._id)
  ) {
    throw new ExpressError(403, "Unauthorized to delete comment");
  }

  await this.deleteCommentAndReplies(commentId);

  if (comment.parent) {
    await Comment.findByIdAndUpdate(
      comment.parent,
      { $pull: { replies: commentId } },
      { new: true }
    );
  } else if (!comment.parent) {
    await Review.findByIdAndUpdate(
      comment.reviewId,
      { $pull: { comments: commentId } },
      { new: true }
    );
  }

  res.status(200).json({ message: "Comment Deleted" });
};

module.exports.likeComment = async (req, res) => {
  const { reviewId, commentId } = req.params;
  const userId = req.userId;

  const user = await User.findById(userId);
  const isLiked = user.likedComments.includes(commentId);

  if (isLiked) {
    const review = await Comment.findByIdAndUpdate(commentId, {
      $inc: { likes: -1 },
      $pull: { likedBy: userId },
    });

    if (!review) {
      throw new ExpressError(404, "Review not found");
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { likedComments: commentId },
      });
    }

    return res.json({ message: "Review unliked successfully" });
  }
  const review = await Comment.findByIdAndUpdate(commentId, {
    $inc: { likes: 1 },
    $addToSet: { likedBy: userId },
  });

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  if (userId) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedComments: commentId },
    });
  }
  res.json({ message: "Review liked successfully" });
};
