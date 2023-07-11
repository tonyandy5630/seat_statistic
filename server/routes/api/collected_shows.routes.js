const express = require("express");
const router = express.Router();
const CollectedShowsController = require("../../controller/collected_shows.controller");

router.get("/", CollectedShowsController.getAllCollectedShows);

module.exports = router;
