const ImageRepository = require("../repositories/imageRepository");
const imageRepository = new ImageRepository();
const CharacterRepository = require("../repositories/characterRepository");
const characterRepository = new CharacterRepository();
const MoviesOrSeriesRepository = require("../repositories/moviesOrSeriesRepository");
const moviesOrSeriesRepository = new MoviesOrSeriesRepository();

const uploadCharacterImage = async (idCharacter, file) => {
  const character = await characterRepository.findById(idCharacter);
  if (character.image) {
    await imageRepository.deleteImage(character.image);
  }
  const imageURL = await imageRepository.uploadImage(
    character.name,
    file.buffer,
    file.mimetype
  );
  return await characterRepository.update(idCharacter, { image: imageURL });
};

const uploadMoviesOrSeriesImage = async (idMoviesOrSeries, file) => {
  const moviesOrSeries = await moviesOrSeriesRepository.findById(
    idMoviesOrSeries
  );
  if (moviesOrSeries.image) {
    await imageRepository.deleteImage(moviesOrSeries.image);
  }
  const imageURL = await imageRepository.uploadImage(
    moviesOrSeries.title,
    file.buffer,
    file.mimetype
  );
  return moviesOrSeriesRepository.update(idMoviesOrSeries, { image: imageURL });
};

module.exports = {
  uploadCharacterImage,
  uploadMoviesOrSeriesImage,
};
