const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {
  signup,
  login,
  getAllUsers,
  getFavouriteBooks,
  toggleFavouriteBook,
  getMe,
  reportUser,
} = require("../controller/users");
const { authorization } = require("../middleware/auth");

router.post("/signup", wrapAsync(signup));

router.post("/login", wrapAsync(login));

router
  .route("/favourites")
  .get(authorization, wrapAsync(getFavouriteBooks))
  .put(authorization, wrapAsync(toggleFavouriteBook));

router.get("/", authorization, wrapAsync(getAllUsers));

router.post("/:userId/report", authorization, wrapAsync(reportUser));

router.get("/me", authorization, wrapAsync(getMe));

module.exports = router;
