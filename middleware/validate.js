const { check, validationResult } = require('express-validator');

const validateContact = () => {
    return [
        check('firstName')
            .trim()
            .escape()
            .isAlpha()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid first name.'),
        check('lastName')
            .trim()
            .escape()
            .isAlpha()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid last name.'),
        check('favoriteColor')
            .trim()
            .escape()
            .isAlpha()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid favorite color.'),
        check('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address.'),
        check('birthday')
            .trim()
            .escape()
            .format('YYYY-MM-DD')
            .isLength({ min: 1 })
            .withMessage('Please provide a valid birthday.')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
}

module.exports = { validateContact, validate }