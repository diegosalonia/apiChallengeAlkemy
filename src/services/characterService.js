const CharacterRepository = require("../repositories/characterRepository");
const repository = new CharacterRepository();
const ImageRepository = require("../repositories/imageRepository");
const MoviesOrSeriesRepository = require("../repositories/moviesOrSeriesRepository");
const moviesOrSeriesRepository = new MoviesOrSeriesRepository();
const imageRepository = new ImageRepository();

const findById = async (id) => {
  return await repository.findByIdWithMoviesOrSeries(id);
};

const findByName = async (name) => {
  return await repository.findByName(name);
};

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const save = async (character) => {
  return await repository.save(character);
};

const update = async (id, character) => {
  return await repository.update(id, character);
};

const remove = async (id) => {
  const character = await repository.findById(id);
  imageRepository.deleteImage(character.image);
  return await repository.remove(id);
};

const associate = async (character, moviesOrSeries) => {
  //const character = await repository.findById(idCharacter);
  //const moviesOrSeries = await moviesOrSeriesRepository.findById(idMovie);
  console.log(`Character: ${character}`);
  await character.addMoviesOrSeries(moviesOrSeries);
};
module.exports = {
  findById,
  findByName,
  findAll,
  save,
  update,
  remove,
  associate,
};
