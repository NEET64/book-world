const { jwtVerify } = require("jose");

module.exports.authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization.toString();

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Not Authenticated" });
    }
    const token = authHeader.split(" ")[1];
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
