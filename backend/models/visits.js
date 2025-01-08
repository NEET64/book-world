const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  userAgent: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  firstLoginDate: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
    type: Number,
    default: 1,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
