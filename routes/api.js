const express = require("express");
const router = express.Router();

// Middleware to check provided accessToken
const checkToken = require("../middlewares/authJwt.js");

const apiController = require("../controllers/api.controller.js");

router.post("/token", apiController.getToken);

router.post("/justify", checkToken, apiController.justify);

module.exports = router;
