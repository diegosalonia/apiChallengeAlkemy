const express = require("express");
const characterService = require("../services/characterService");
const imageServices = require("../services/imageServices");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllCharacters = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));
    const { filter = "", options = "" } = req.query;
    const characters = await characterService.findAll(filter, options);
    res.json(new Success(characters));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createCharacter = async (req, res, next) => {
  try {
    let character = req.body;
    character = await characterService.save(character);

    res.status(201).json(new Success(character));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    let character = req.body;

    const characterUpdated = await characterService.update(id, character);

    res.json(new Success(characterUpdated));
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
    const character = await characterService.findById(req.params.id);
    res.json(new Success(character));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await characterService.remove(id);
    res.json(new Success(character));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const uploadCharacterImage = async (req, res, next) => {
  try {
    const characterId = req.body.id;
    const image = req.file;

    res.json(
      new Success(await imageServices.uploadCharacterImage(characterId, image))
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
const associateMoviesOrSeries = async (req, res, next) => {
  try {
    //const { idCharacter, idMovie } = req.params;
    const character = req.character;
    const moviesOrSeries = req.moviesOrSeries;
    console.log(`character: ${character}`);
    await characterService.associate(character, moviesOrSeries);

    res.json(new Success());
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getById,
  deleteCharacter,
  uploadCharacterImage,
  associateMoviesOrSeries,
};
