const { Router } = require("express");
const multer = require("multer");
const upload = multer();
const {
  getAllMoviesOrSeries,
  createMoviesOrSeries,
  updateMoviesOrSeries,
  getById,
  deleteMoviesOrSeries,
  uploadMoviesOrSeriesImage,
  associateCharacter,
} = require("../controllers/moviesOrSeries");
const { associationRequestValidation } = require("../middlewares/characters");
const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
} = require("../middlewares/moviesOrSeries");

const router = Router();

router.get("/", getAllRequestValidation, getAllMoviesOrSeries);
router.post("/", postRequestValidations, createMoviesOrSeries);
router.put("/:id(\\d+)/", putRequestValidations, updateMoviesOrSeries);
router.get("/:id(\\d+)/", getRequestValidation, getById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteMoviesOrSeries);
router.post("/image", postImageRequestValidations, uploadMoviesOrSeriesImage);
router.put(
  "/:moviesOrSeriesId(\\d+)/characters/:characterId(\\d+)/",
  associationRequestValidation,
  associateCharacter
);

module.exports = router;
