require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Allow usage from all origin
app.use(cors({ origin: "*" }));

// Parse input from POST request with "text/plain" content
app.use(bodyParser.text());
// Parse input from url encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies in req.cookies
app.use(cookieParser());

// Set up session management using MongoDB Atlas as memory store
const mongoose = require("mongoose");
// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Successful - Connection to MongoDB Atlas"))
  .catch(() => console.log("Error - Connection to MongoDB Atlas"));

const session = require("express-session");
const mgSessionStore = require("connect-mongo");

app.use(
  session({
    name: "eighty",
    store: mgSessionStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
    }),
    secret: "secretToProtectJustify",
    cookie: {
      httpOnly: true,
      secure: process.env.ENVIRONMENT == "PRODUCTION" ? true : false,
      sameSite: false,
      maxAge:
        process.env.ENVIRONMENT == "PRODUCTION"
          ? 24 * 60 * 60 * 1000
          : 3 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Justify server");
});

const api = require("./routes/api");
app.use("/api", api);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Justify is listening on port ${port}`);
});
