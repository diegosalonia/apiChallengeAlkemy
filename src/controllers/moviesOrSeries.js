const express = require("express");
const moviesOrSeriesService = require("../services/moviesOrSeriesService");
const characterService = require("../services/characterService");
const imageServices = require("../services/imageServices");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllMoviesOrSeries = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));
    const { filter = "", options = "" } = req.query;
    const moviesOrSeries = await moviesOrSeriesService.findAll(filter, options);
    res.json(new Success(moviesOrSeries));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createMoviesOrSeries = async (req, res, next) => {
  try {
    let moviesOrSeries = req.body;
    moviesOrSeries = await moviesOrSeriesService.save(moviesOrSeries);

    res.status(201).json(new Success(moviesOrSeries));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateMoviesOrSeries = async (req, res, next) => {
  try {
    const { id } = req.params;
    let moviesOrSeries = req.body;

    const moviesOrSeriesUpdated = await moviesOrSeriesService.update(
      id,
      moviesOrSeries
    );

    res.json(new Success(moviesOrSeriesUpdated));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getById = async (req, res, next) => {
  try {
    const moviesOrSeries = await moviesOrSeriesService.findById(req.params.id);
    res.json(new Success(moviesOrSeries));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteMoviesOrSeries = async (req, res, next) => {
  try {
    const { id } = req.params;
    const moviesOrSeries = await moviesOrSeriesService.remove(id);
    res.json(new Success(moviesOrSeries));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const uploadMoviesOrSeriesImage = async (req, res, next) => {
  try {
    const moviesOrSeriesId = req.body.id;
    const image = req.file;

    res.json(
      new Success(
        await imageServices.uploadMoviesOrSeriesImage(moviesOrSeriesId, image)
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const associateCharacter = async (req, res, next) => {
  try {
    const { characterId, moviesOrSeriesId } = req.params;
    // const character = req.character;
    // const moviesOrSeries = req.moviesOrSeries
    console.log(`character: ${characterId}`);
    await moviesOrSeriesService.associate(moviesOrSeriesId, characterId);

    res.json(new Success());
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMoviesOrSeries,
  createMoviesOrSeries,
  updateMoviesOrSeries,
  getById,
  deleteMoviesOrSeries,
  uploadMoviesOrSeriesImage,
  associateCharacter,
};
