const express = require("express");
const router = express.Router();
const RegionController = require("../../controller/regions.controller");

router.get("/", RegionController.getAllRegion);

module.exports = router;
