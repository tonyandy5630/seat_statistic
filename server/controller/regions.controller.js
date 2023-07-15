const db = require("../database/models");
const Region = db.region;
const {
  QUERY_REGION_STAT,
  QUERY_EACH_REGION_STAT,
  QUERY_EACH_MOVIE_RATE_AT_REGIONS,
  QUERY_EACH_MOVIE_PERCENT_AT_A_REGION,
} = require("../database/queries/region.ts");

class RegionController {
  static async getAllRegion(req, res, next) {
    try {
      const regions = await Region.findAll({});
      return res.status(200).send({ data: { regions } });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * This function returns regions with percent of that cinemas
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */

  static async getEachRegionSeatRatio(req, res, next) {
    try {
      const [StatOfRegions, data] = await db.sequelize.query(QUERY_REGION_STAT);

      const regionStats = await Promise.all(
        StatOfRegions.map(async ({ region, id, TotalSeatRatio }) => {
          const _reg = {};
          const [reg, _] = await db.sequelize.query(
            QUERY_EACH_REGION_STAT(id, TotalSeatRatio)
          );

          //* add region and id and name properties to object
          _reg.id = id;
          _reg.name = region;
          _reg.value = reg;

          return _reg;
        })
      );

      return res.status(200).send({ data: regionStats });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async getEachRegionPerMovie(req, res, next) {
    try {
      const Movie = db.movie;
      const movies = await Movie.findAll({});

      let totalMovieRateAtEachRegion = [];
      await Promise.all(
        movies.map(async ({ id, movieName }) => {
          const [rate, _] = await db.sequelize.query(
            QUERY_EACH_MOVIE_RATE_AT_REGIONS(id)
          );

          if (rate.length !== 0 && rate !== undefined) {
            const res = rate.map((region) => {
              const regTempRateHas = totalMovieRateAtEachRegion.find(
                (reg) => reg.region === region.region
              );
              if (regTempRateHas === undefined) {
                totalMovieRateAtEachRegion.push(region);
                return region;
              }

              const newPercent = parseFloat(region.percentage);
              const regTempPercent =
                parseFloat(regTempRateHas.percentage) + newPercent;
              regTempRateHas.percentage = regTempPercent.toFixed(1);
              return regTempRateHas;
            });
          }
          return totalMovieRateAtEachRegion;
        })
      );

      if (totalMovieRateAtEachRegion.length === 0) {
        return [];
      }

      const result = await Promise.all(
        totalMovieRateAtEachRegion.map(async ({ id, region, percentage }) => {
          const _reg = {};
          const [reg, _] = await db.sequelize.query(
            QUERY_EACH_MOVIE_PERCENT_AT_A_REGION(id, percentage)
          );

          _reg.id = id;
          _reg.name = region;
          _reg.value = reg;
          return _reg;
        })
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

module.exports = RegionController;
