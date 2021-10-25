const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller.js");

router.post("/token", apiController.getToken);

module.exports = router;
