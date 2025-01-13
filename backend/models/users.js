const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  auth_method: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  picture: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  reportedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likedReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  likedComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
