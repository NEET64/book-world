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
  getUser,
  promoteUser,
} = require("../controller/users");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, wrapAsync(getAllUsers));

router.post("/signup", wrapAsync(signup));

router.post("/login", wrapAsync(login));

router
  .route("/favourites")
  .get(authorization, wrapAsync(getFavouriteBooks))
  .put(authorization, wrapAsync(toggleFavouriteBook));

router.get("/me", authorization, wrapAsync(getMe));

router.get("/:userId", getUser);

router.post("/:userId/report", authorization, wrapAsync(reportUser));

router.put("/:userId/promote", authorization, wrapAsync(promoteUser));

module.exports = router;
