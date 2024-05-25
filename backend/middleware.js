const jwt = require("jsonwebtoken");
const ExpressError = require("./utils/ExpressErrors");

module.exports.authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ExpressError(403, "not Authenticated");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    throw new Error(403, err);
  }
};
