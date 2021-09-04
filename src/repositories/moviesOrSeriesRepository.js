const { Op } = require("sequelize");
const MoviesOrSeries = require("../models/moviesOrSeries");
const { parseISO } = require("date-fns");
const Character = require("../models/characters");

class MoviesOrSeriesRepository {
  constructor() {}

  //implementar filtro
  async findAll(
    { title, calification, creationDate },
    { limit, offset, order }
  ) {
    let where = {};
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (calification) {
      where.calification = {
        [Op.eq]: calification,
      };
    }
    if (creationDate) {
      where.creationDate = {
        [Op.eq]: creationDate,
      };
    }

    let config = {
      where,
      attributes: ["title", "image", "creationDate"],
    };
    if (order) {
      config.order = [order.split(";")];
    }
    return await MoviesOrSeries.findAll(config);
  }

  async findById(id) {
    return await MoviesOrSeries.findByPk(id);
  }

  async findByIdWithCharacters(id) {
    return await MoviesOrSeries.findByPk(id, {
      include: ["content", "gender", "character"],
      attributes: ["id", "title", "image", "creationDate", "calification"],
    });
  }

  async findByTitle(title) {
    return await MoviesOrSeries.findOne({ where: { title } });
  }

  async save(moviesOrSeries) {
    return await MoviesOrSeries.create(moviesOrSeries);
  }

  async update(id, moviesOrSeries) {
    return await MoviesOrSeries.update(moviesOrSeries, { where: { id } });
  }

  async remove(id) {
    return await MoviesOrSeries.destroy({ where: { id } });
  }
}

module.exports = MoviesOrSeriesRepository;
