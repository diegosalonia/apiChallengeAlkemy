const { Router } = require("express");
const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getById,
  deleteCharacter,
  uploadCharacterImage,
  associateMoviesOrSeries,
} = require("../controllers/characters");
const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  associationRequestValidation,
} = require("../middlewares/characters");

const router = Router();

router.get("/", getAllRequestValidation, getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
router.get("/:id(\\d+)/", getRequestValidation, getById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);
router.post("/image", postImageRequestValidations, uploadCharacterImage);
router.put(
  "/:characterId(\\d+)/movies/:moviesOrSeriesId(\\d+)/",
  associationRequestValidation,
  associateMoviesOrSeries
);

module.exports = router;
