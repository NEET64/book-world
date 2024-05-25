const { jwtVerify } = require("jose");
const ExpressError = require("./utils/ExpressErrors");

module.exports.authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "Not Authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    req.userId = payload.id;
    req.role = payload.role;

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
