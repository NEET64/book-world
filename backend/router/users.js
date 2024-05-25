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
} = require("../controller/users");
const { authorization } = require("../middleware");

router.post("/signup", wrapAsync(signup));

router.post("/login", wrapAsync(login));

router
  .route("/favourites")
  .get(authorization, wrapAsync(getFavouriteBooks))
  .put(authorization, wrapAsync(toggleFavouriteBook));

router.get("/", authorization, wrapAsync(getAllUsers));

router.get("/me", authorization, wrapAsync(getMe));

module.exports = router;
