const { validationResult, checkSchema } = require("express-validator");
const AppError = require("../errors/appError");

const validResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("ValidaTion Errors", 400, errors.errors);
  }
  next();
};

const imageRequired = checkSchema({
  image: {
    custom: {
      options: (value, { req }) => !!req.file,
      errorMessage: "You should upload an image",
    },
  },
});

module.exports = {
  validationResult: validResult,
  imageRequired,
};
