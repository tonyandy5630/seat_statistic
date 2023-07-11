const db = require("../database/models");
const Cinema = db.cinema;

class CinemaController {
  static async getAllCinema(req, res, next) {
    try {
      const cinemas = await Cinema.findAll({});
      return res.status(200).send(cinemas);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = CinemaController;
