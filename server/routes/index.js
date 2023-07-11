const express = require("express");
const router = express.Router();

const showsRoutes = require("./api/shows.routes");
const cinemasRoutes = require("./api/cinemas.routes");
const regionRoutes = require("./api/regions.routes");
const movieRoutes = require("./api/movies.routes");
const collectedShowRoutes = require("./api/collected_shows.routes");

router.use("/shows", showsRoutes);
router.use("/cinemas", cinemasRoutes);
router.use("/regions", regionRoutes);
router.use("/collectedshows", collectedShowRoutes);
router.use("/movies", movieRoutes);

module.exports = router;
