const db = require("../database/models");
const CollectedShows = db.collected_show;

class CollectedShowsController {
  static async getAllCollectedShows(req, res, next) {
    try {
      const collectedShows = await CollectedShows.findAll({});

      return res.status(200).send({ data: collectedShows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CollectedShowsController;
