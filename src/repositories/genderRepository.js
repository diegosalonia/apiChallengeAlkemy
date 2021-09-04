const Gender = require("../models/gender");

class GenderRepository {
  constructor() {}

  async findById(id) {
    return await Gender.findByPk(id);
  }

  async findByDescription(description) {
    return await Gender.findOne({ where: { description } });
  }
}

module.exports = GenderRepository;
