const express = require("express");
const router = express.Router();
const MovieController = require("../../controller/movies.controller");

router.get("/", MovieController.getAllMovie);
router.get("/ratio-per-region", MovieController.getRegionPercentPerMovie);
router.get("/ratio-per-cinema", MovieController.getCinemaPercentPerMovie);

module.exports = router;
