const db = require("../database/models");
const Show = db.show;

class ShowController {
  /**
   * function return all shows in db
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */

  static async getAllShows(req, res, next) {
    try {
      const shows = await Show.findAll({});

      return res.status(200).send({ data: shows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ShowController;
