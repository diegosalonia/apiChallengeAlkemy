const MoviesOrSeriesRepository = require("../repositories/moviesOrSeriesRepository");
const CharacterRepository = require("../repositories/characterRepository");
const GenderRepository = require("../repositories/genderRepository");
const ContentRepository = require("../repositories/contentRepository");
const repository = new MoviesOrSeriesRepository();
const characterRepository = new CharacterRepository();
const genderRepository = new GenderRepository();
const contentRepository = new ContentRepository();

const findById = async (id) => {
  return await repository.findByIdWithCharacters(id);
};

// const findById = async (id) => {
//   return await repository.findById(id);
// };

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const save = async (moviesOrSeries) => {
  const gender = await genderRepository.findByDescription(
    moviesOrSeries.gender
  );
  moviesOrSeries.genderId = gender.id;
  const content = await contentRepository.findByDescription(
    moviesOrSeries.content
  );
  moviesOrSeries.contentId = content.id;
  return await repository.save(moviesOrSeries);
};

const update = async (id, moviesOrSeries) => {
  if (moviesOrSeries.gender) {
    const gender = await genderRepository.findByDescription(
      moviesOrSeries.gender
    );
    moviesOrSeries.genderId = gender.id;
    const content = await contentRepository.findByDescription(
      moviesOrSeries.content
    );
    moviesOrSeries.contentId = content.id;
  }
  return await repository.update(id, moviesOrSeries);
};

const remove = async (id) => {
  return await repository.remove(id);
};

const associate = async (moviesOrSeriesId, characterId) => {
  const character = await characterRepository.findById(characterId);
  const moviesOrSeries = await repository.findById(moviesOrSeriesId);
  console.log(`Movies: ${moviesOrSeries}`);
  await moviesOrSeries.addCharacter(character);
};

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
  associate,
};
