const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const moviesOrSeriesService = require("../../services/moviesOrSeriesService");
const characterService = require("../../services/characterService");
const MoviesOrSeriesRepository = require("../../repositories/moviesOrSeriesRepository");
const moviesOrSeriesRepository = new MoviesOrSeriesRepository();
const CharacterRepository = require("../../repositories/characterRepository");
const characterRepository = new CharacterRepository();
const ContentRepository = require("../../repositories/contentRepository");
const GenderRepository = require("../../repositories/genderRepository");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const multer = require("multer");
const upload = multer();
const logger = require("../../loaders/logger");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");
const contentRepository = new ContentRepository();
const genderRepository = new GenderRepository();

// const _idRequired = check("id").notEmpty();
// const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const moviesOrSeriesFound = await moviesOrSeriesService.findById(id);
  if (!moviesOrSeriesFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _creationDateIsDateAndOptional = check("creationDate")
  .optional()
  .isDate();
const _creationDateRequired = check("creationDate").notEmpty();
const _creationDateIsDate = check("creationDate").isDate();

const _titleOptional = check("title").optional();
const _titleRequired = check("title", "Title required").notEmpty();
const _titleNotExist = check("title").custom(async (title = "") => {
  const moviesOrSeriesFound = await moviesOrSeriesService.findByTitle(title);
  if (moviesOrSeriesFound) {
    throw new AppError("The title exist in DB", 400);
  }
});

const _calificationIsNumericAndOptional = check("calification")
  .optional()
  .isNumeric();
const _calificationRequired = check("calification").notEmpty();
const _calificationIsNumeric = check("calification").isNumeric();
const _contentExistValidation = async (content = "") => {
  const contentFound = await contentRepository.findByDescription(content);
  if (!contentFound) {
    throw new AppError("The content type does not exist in DB", 400);
  }
};
const _genderExistValidation = async (gender = "") => {
  const genderFound = await genderRepository.findByDescription(gender);
  if (!genderFound) {
    throw new AppError("The gender type does not exist in DB", 400);
  }
};

const _contentExist = check("content").custom(_contentExistValidation);
const _genderExist = check("gender").custom(_genderExistValidation);
const _contentExistAndOptional = check("content")
  .optional()
  .custom(_contentExistValidation);
const _genderExistAndOptional = check("gender")
  .optional()
  .custom(_genderExistValidation);

const _idRequired = (name) => {
  return check(name).not().isEmpty();
};
const _idIsNumeric = (name) => {
  return check(name).isNumeric();
};
const _idCharacterExist = check("characterId").custom(
  async (characterId = "", { req }) => {
    const characterFound = await characterRepository.findById(characterId);
    if (!characterFound) {
      throw new AppError("The Character id does not exist in DB", 400);
    }
    req.character = characterFound;
    console.log(`Character: ${characterFound}`);
  }
);

const _idMoviesOrSeriesExist = check("moviesOrSeriesId").custom(
  async (moviesOrSeriesId = "", { req }) => {
    console.log(`pasa por aca: ${moviesOrSeriesId}`);
    const moviesOrSeriesFound = await moviesOrSeriesRepository.findById(
      moviesOrSeriesId
    );
    if (!moviesOrSeriesFound) {
      console.log(`pasa por aca: ${moviesOrSeriesFound}`);
      throw new AppError("The Movies Or Series id does not exist in DB", 400);
    }
    req.moviesOrSeries = moviesOrSeriesFound;
  }
);

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleNotExist,
  _creationDateRequired,
  _creationDateIsDate,
  _calificationIsNumeric,
  _calificationRequired,
  _contentExist,
  _genderExist,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  _titleOptional,
  _titleNotExist,
  _creationDateIsDateAndOptional,
  _calificationIsNumericAndOptional,
  _contentExistAndOptional,
  _genderExistAndOptional,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  validationResult,
];

const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  imageRequired,
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  validationResult,
];

const associationRequestValidation = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("characterId"),
  _idIsNumeric("characterId"),
  _idCharacterExist,
  _idRequired("moviesOrSeriesId"),
  _idIsNumeric("moviesOrSeriesId"),
  _idMoviesOrSeriesExist,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  associationRequestValidation,
};
