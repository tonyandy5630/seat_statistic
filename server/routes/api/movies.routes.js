const express = require("express");
const router = express.Router();
const MovieController = require("../../controller/movies.controller");

router.get("/", MovieController.getAllMovie);

module.exports = router;
