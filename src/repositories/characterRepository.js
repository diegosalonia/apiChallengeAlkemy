const { Op } = require("sequelize");
const Character = require("../models/characters");
const MoviesOrSeries = require("../models/moviesOrSeries");

class CharacterRepository {
  constructor() {}

  //implementar filtro
  async findAll(
    { name, age, weigth, movOrSerTitle },
    { limit, offset, order }
  ) {
    let where = {};
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (age) {
      where.age = {
        [Op.eq]: age,
      };
    }
    if (weigth) {
      where.weigth = {
        [Op.eq]: weigth,
      };
    }

    return await Character.findAll({
      where,
      attributes: ["name", "image"],
    });
  }

  async findById(id) {
    return await Character.findByPk(id);
  }
  async findByIdWithMoviesOrSeries(id) {
    return await Character.findByPk(id, {
      include: [
        {
          model: MoviesOrSeries,
          as: "moviesOrSeries",
        },
      ],
    });
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async save(character) {
    return await Character.create(character);
  }

  async update(id, character) {
    return await Character.update(character, { where: { id } });
  }

  async remove(id) {
    return await Character.destroy({ where: { id } });
  }
}

module.exports = CharacterRepository;
