const express = require("express");
const router = express.Router();
const RegionController = require("../../controller/regions.controller");

router.get("/", RegionController.getAllRegion);
router.get("/ratio", RegionController.getEachRegionSeatRatio);
router.get("/ratio-per-movie", RegionController.getEachRegionPerMovie);

module.exports = router;
