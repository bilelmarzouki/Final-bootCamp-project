const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(payload);
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error)// remove on production
    res
      .status(401)
      .json({
        errorMessage: "There is no token. Or token is invalid or expired.",
      });
  }
}

function verifyCreator(req, res, next) {
  // this is a protection middleware that checks if the user is of type admin
  // IT WILL ALWAYS BE USED AFTER verifyToken

  if (req.payload.role === "stylist") {
    next() // you are an stylist, continue with the route.
  } else {
    res.status(401).json({errorMessage: "Route only for stylists, you are not an stylist"})
  }
}

module.exports = {
  verifyToken,
  verifyCreator,
};
