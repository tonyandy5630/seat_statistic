const db = require("../database/models");
const {
  QUERY_EACH_MOVIE_RATE_AT_CINEMAS,
  QUERY_EACH_MOVIE_RATE_PER_CINEMA,
} = require("../database/queries/cinema");
const Cinema = db.cinema;

class CinemaController {
  static async getAllCinema(req, res, next) {
    try {
      const cinemas = await Cinema.findAll({});
      return res.status(200).send({ data: cinemas });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMovieRatioPerCinema(req, res, next) {
    try {
      const Movie = db.movie;
      const movies = await Movie.findAll({});

      let totalMovieRatePerCinema = [];
      await Promise.all(
        movies.map(async ({ id, movieName }) => {
          const [rate, _] = await db.sequelize.query(
            QUERY_EACH_MOVIE_RATE_AT_CINEMAS(id)
          );

          if (rate.length !== 0 && rate !== undefined) {
            rate.map((cinema) => {
              const cinemaTempRateHas = totalMovieRatePerCinema.find(
                (cin) => cin.cinemaName === cinema.cinemaName
              );
              if (cinemaTempRateHas === undefined) {
                totalMovieRatePerCinema.push(cinema);
                return cinema;
              }

              const newPercent = parseFloat(cinema.percentage);
              const regTempPercent =
                parseFloat(cinemaTempRateHas.percentage) + newPercent;
              cinemaTempRateHas.percentage = regTempPercent.toFixed(1);
              return cinemaTempRateHas;
            });
          }
          return totalMovieRatePerCinema;
        })
      );

      if (totalMovieRatePerCinema.length === 0) {
        return [];
      }

      const result = await Promise.all(
        totalMovieRatePerCinema.map(
          async ({ cinemaId, cinemaName, percentage }) => {
            const _cin = {};
            const [cin, _] = await db.sequelize.query(
              QUERY_EACH_MOVIE_RATE_PER_CINEMA(cinemaId, percentage)
            );

            _cin.id = cinemaId;
            _cin.name = cinemaName;
            _cin.value = cin;
            return _cin;
          }
        )
      );

      return res.status(200).send({ data: result });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
}

module.exports = CinemaController;
