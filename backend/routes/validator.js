const {check, validationResult} = require('express-validator');

exports.validateUser = [
  check('firstname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
    check('lastname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('last name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid password!')
    .bail()
    .isLength({min: 8})
    .withMessage('Minimum 8 characters required!')
    .bail(),
    check('phone_number')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid phone number!')
    .bail()
    .isLength({min: 10})
    .withMessage('Minimum 10 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];
exports.validateUpd = [
    check('firstname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required!')
      .bail(),
      check('lastname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('last name can not be empty!')
      .bail()
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('phone_number')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid phone number!')
      .bail()
      .isLength({min: 10})
      .withMessage('Minimum 10 characters required!')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];
exports.validateLogin = [
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
  check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid password!')
      .bail()
      .isLength({min: 8})
      .withMessage('Minimum 8 characters required!')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];
  exports.validateAddress = [
    check('pincode')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('pincode can not be empty!')
      .bail()
      .isLength({min: 6})
      .withMessage('Minimum 6 characters required!')
      .bail(),
    check('address_line')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('address can not be empty!')
      .bail()
      .isLength({min: 16})
      .withMessage('Minimum 16 characters required!')
      .bail(),
    check('state')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid state')
      .bail()
      .isLength({min: 4})
      .withMessage('Minimum 4 characters required!')
      .bail(),
  check('city')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid city')
      .bail()
      .isLength({min: 4})
      .withMessage('Minimum 4 characters required!')
      .bail(),
      check('country')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid Country!')
      .bail()
      .isLength({min: 4})
      .withMessage('Minimum 4 characters required!')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];
  