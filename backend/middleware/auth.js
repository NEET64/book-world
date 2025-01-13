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

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}
module.exports.googleAuthMiddleware = async (req, res, next) => {
  if (req.body.auth_method && req.body.auth_method == "google") {
    verify(req.body.token)
      .then((payload) => {
        req.body.firstName = payload.given_name;
        req.body.lastName = payload.family_name;
        req.body.email = payload.email;
        req.body.picture = payload.picture;
        next();
      })
      .catch((err) => {
        res.status(403).json({ message: "Invalid Token" });
      });
  } else {
    next();
  }
};
