const db = require("../database/models");
const Movie = db.movie;

class MovieController {
  static async getAllMovie(req, res, next) {
    try {
      const movies = await Movie.findAll();
      return res.status(200).send({ data: movies });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MovieController;
