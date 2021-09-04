const Content = require("../models/content");

class ContentRepository {
  constructor() {}

  async findById(id) {
    return await Content.findByPk(id);
  }

  async findByDescription(description) {
    return await Content.findOne({ where: { description } });
  }
}

module.exports = ContentRepository;
