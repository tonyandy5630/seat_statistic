const db = require("../database/models");
const Region = db.region;

class RegionController {
  static async getAllRegion(req, res, next) {
    try {
      const regions = await Region.findAll({});
      return res.status(200).send({ data: regions });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RegionController;
