const express = require("express");
const CinemaController = require("../../controller/cinemas.controller");
const router = express.Router();

router.get("/", CinemaController.getAllCinema);

module.exports = router;
