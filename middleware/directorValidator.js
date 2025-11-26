const { body, validationResult } = require("express-validator");
const validate = {};

// Validation rules for Directors
validate.directorRules = () => {
  return [
    // fullName is required
    body('fullName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Full name is required.')
      .isString()
      .withMessage('Full name must be a string.'),

    // age is required and must be a number
    body('age')
      .notEmpty()
      .withMessage('Age is required.')
      .isInt({ min: 1 })
      .withMessage('Age must be a valid number.'),

    // nationality is required
    body('nationality')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Nationality is required.'),

    // knownFor is required and must be an array
    body('knownFor')
      .notEmpty()
      .withMessage('KnownFor field is required.')
      .isArray()
      .withMessage('KnownFor must be an array of movie titles.'),

    // awardsCount is required and must be a number
    body('awardsCount')
      .notEmpty()
      .withMessage('Awards count is required.')
      .isInt({ min: 0 })
      .withMessage('Awards count must be a number.')
  ];
};

// Middleware to check validation results
validate.checkDirectorData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: errors.array(),
    });
  }
  next();
};

module.exports = validate;
