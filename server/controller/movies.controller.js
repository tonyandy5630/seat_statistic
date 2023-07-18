const db = require("../database/models");
const {
  QUERY_REGION_PERCENT_EACH_MOVIE,
  QUERY_TOTAL_MOVIE_RATE_AT_REGIONS,
  QUERY_TOTAL_MOVIE_RATE_AT_CINEMAS,
  QUERY_EACH_CINEMA_PERCENT_PER_MOVIE,
} = require("../database/queries/movies");
const Movie = db.movie;

class MovieController {
  static async getAllMovie(req, res, next) {
    try {
      const movies = await Movie.findAll();
      return res.status(200).send({ data: movies });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async getRegionPercentPerMovie(req, res, next) {
    try {
      const [totalMoviesPercent, _] = await db.sequelize.query(
        QUERY_TOTAL_MOVIE_RATE_AT_REGIONS
      );

      const regionPercentPerMovie = await Promise.all(
        totalMoviesPercent.map(async ({ movieId, name, percentage }) => {
          if (parseInt(percentage) === 0) percentage = 1;
          const [mov, _] = await db.sequelize.query(
            QUERY_REGION_PERCENT_EACH_MOVIE(movieId, percentage)
          );
          return {
            id: movieId,
            name,
            value: mov,
          };
        })
      );

      return res.status(200).send({ data: regionPercentPerMovie });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async getCinemaPercentPerMovie(req, res, next) {
    try {
      const movies = await db.movie.findAll({});

      const totalMoviePercentAtCinema = await Promise.all(
        movies.map(async ({ id }) => {
          const [mov, _] = await db.sequelize.query(
            QUERY_TOTAL_MOVIE_RATE_AT_CINEMAS(id)
          );

          return mov.at(0);
        })
      );

      const filterTotalMoviePercentAtCinema = totalMoviePercentAtCinema.filter(
        (mov) => mov !== undefined
      );

      const cinemaPercentPerMovie = await Promise.all(
        filterTotalMoviePercentAtCinema.map(
          async ({ movieId, movieName, percentage }) => {
            if (parseInt(percentage) === 0) percentage = 1;
            const [mov, _] = await db.sequelize.query(
              QUERY_EACH_CINEMA_PERCENT_PER_MOVIE(movieId, percentage)
            );

            return {
              id: movieId,
              name: movieName,
              value: mov,
            };
          }
        )
      );
      return res.status(200).send({ data: cinemaPercentPerMovie });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
}

module.exports = MovieController;
