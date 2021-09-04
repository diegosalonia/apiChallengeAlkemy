const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Content = sequelize.define(
  "Content",
  {
    // Model attributes are defined here
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Content;

Content.hasMany(require("./moviesOrSeries"), {
  as: "moviesOrSeries",
  foreignKey: "moviesOrSeriesId",
});
