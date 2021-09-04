const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const characterService = require("../../services/characterService");
const moviesOrSeriesService = require("../../services/moviesOrSeriesService");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const multer = require("multer");
const upload = multer();
const logger = require("../../loaders/logger");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");

const _nameRequired = check("name", "Name required").not().isEmpty();

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

// const _idRequired = check("id").notEmpty();
// const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const characterFound = await characterService.findById(id);
  if (!characterFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _historyRequired = check("history").not().isEmpty();
const _ageIsNumeric = check("age").optional().isNumeric();
const _weigthIsNumeric = check("weigth").optional().isNumeric();
const _nameNotExist = check("name").custom(async (name = "") => {
  const characterFound = await characterService.findByName(name);
  if (characterFound) {
    throw new AppError("The name exist in DB", 400);
  }
});

const _idRequired = (name) => {
  return check(name).not().isEmpty();
};
const _idIsNumeric = (name) => {
  return check(name).isNumeric();
};
const _idCharacterExist = check("characterId").custom(
  async (characterId = "", { req }) => {
    const characterFound = await characterService.findById(characterId);
    if (!characterFound) {
      throw new AppError("The Character id does not exist in DB", 400);
    }
    req.character = characterFound;
    console.log(`Character: ${characterFound}`);
  }
);

const _idMoviesOrSeriesExist = check("moviesOrSeriesId").custom(
  async (moviesOrSeriesId = "", { req }) => {
    const moviesOrSeriesFound = await moviesOrSeriesService.findById(
      moviesOrSeriesId
    );
    if (!moviesOrSeriesFound) {
      throw new AppError("The Movies Or Series id does not exist in DB", 400);
    }
    req.moviesOrSeries = moviesOrSeriesFound;
  }
);

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _nameNotExist,
  _ageIsNumeric,
  _historyRequired,
  _weigthIsNumeric,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _nameNotExist,
  _idIsNumeric("id"),
  _idExist,
  _ageIsNumeric,
  _weigthIsNumeric,
  _roleValid,
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
