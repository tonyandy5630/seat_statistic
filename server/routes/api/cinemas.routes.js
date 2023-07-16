const express = require("express");
const CinemaController = require("../../controller/cinemas.controller");
const router = express.Router();

router.get("/", CinemaController.getAllCinema);
router.get("/ratio-per-movie", CinemaController.getMovieRatioPerCinema);
module.exports = router;
