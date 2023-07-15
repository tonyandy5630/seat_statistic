const express = require("express");
const router = express.Router();
const CollectedShowsController = require("../../controller/collected_shows.controller");

router.get("/", CollectedShowsController.getAllCollectedShows);
router.get(
  "/latest-record-time",
  CollectedShowsController.getLatestCollectedTime
);

module.exports = router;
