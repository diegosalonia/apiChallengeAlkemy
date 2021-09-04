const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const MoviesOrSeries = sequelize.define("MoviesOrSeries", {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  },
  creationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = MoviesOrSeries;

MoviesOrSeries.belongsToMany(require("./characters"), {
  through: "charactersMoviesOrSeries",
  as: "character",
  foreignKey: "moviesOrSeriesId",
});

MoviesOrSeries.belongsTo(require("./content"), {
  foreignKey: "contentId",
  targetKey: "id",
  as: "content",
});

MoviesOrSeries.belongsTo(require("./gender"), {
  foreignKey: "genderId",
  targetKey: "id",
  as: "gender",
});
