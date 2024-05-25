const { JWSVerifier } = require("jose");
const ExpressError = require("./utils/ExpressErrors");

module.exports.authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ExpressError(403, "not Authenticated");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verifier = new JWSVerifier(process.env.JWT_SECRET);
    const { payload } = await verifier.verify(token);

    req.userId = payload.id;
    req.role = payload.role;

    next();
  } catch (err) {
    throw new ExpressError(403, "Invalid Token");
  }
};
