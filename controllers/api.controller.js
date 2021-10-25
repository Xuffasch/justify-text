const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

exports.getToken = function (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error while looking for user : ", err);
      res
        .status(500)
        .send({ err: err, message: "Error while searching for user" });
    }
    if (!user) {
      res.status(404).send({ err: err, message: "User is not found" });
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60,
        }
      );

      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token,
      });
    }
  });
};
