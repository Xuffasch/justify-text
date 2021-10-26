const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send({
      message:
        "Please provide a correct accessToken in the request header 'x-access-token'",
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res
        .status(401)
        .send({ message: "Unauthorized or your accessToken may have expired" });
      return;
    }
    req.email = decoded.email;
    next();
  });
};

module.exports = verifyToken;
