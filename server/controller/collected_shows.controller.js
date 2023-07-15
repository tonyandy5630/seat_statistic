const db = require("../database/models");
const CollectedShows = db.collected_show;
const {
  QUERY_LATEST_RECORD_TIME,
} = require("../database/queries/collected-shows.ts");

class CollectedShowsController {
  static async getAllCollectedShows(req, res, next) {
    try {
      const collectedShows = await CollectedShows.findAll({});

      return res.status(200).send({ data: collectedShows });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async getLatestCollectedTime(req, res, next) {
    try {
      const [latestTime, _] = await db.sequelize.query(
        QUERY_LATEST_RECORD_TIME
      );
      return res.status(200).send({ data: latestTime[0] });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
}

module.exports = CollectedShowsController;
