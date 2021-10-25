const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const eightyChar = require("../services/eighty.js");

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

exports.justify = function (req, res) {
  if (!req.email) {
    res.status(403).send({ message: "Unauthorized !" });
  }

  // Get all the words after cleaning up space characters and loose empty strings;
  let words = req.body
    .replace(/n/g, "")
    .split(" ")
    .filter((w) => w != "");

  if (req.session && req.session.usage + words.length > 1000) {
    res.status(403).send("Payment required - Daily usage limit reached ");
  }

  let output = eightyChar(req.body);
  req.session.usage = !req.session.usage
    ? words.length
    : req.session.usage + words.length;

  res.send(`${output}`);
};
