const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Gender = sequelize.define(
  "Gender",
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
module.exports = Gender;

Gender.hasMany(require("./moviesOrSeries"), {
  as: "moviesOrSeries",
  foreignKey: "moviesOrSeries",
});
