const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

reviewSchema.post("save", async function (error, doc, next) {
  if (error.code === 11000) {
    throw new Error(
      "Duplicate review detected. Please submit a unique review."
    );
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
