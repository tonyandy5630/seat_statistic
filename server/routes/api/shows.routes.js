const express = require("express");
const ShowController = require("../../controller/shows.controller");
const router = express.Router();

router.get("/", ShowController.getAllShows);

module.exports = router;
