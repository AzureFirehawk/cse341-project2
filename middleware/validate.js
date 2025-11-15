const { body, validationResult } = require('express-validator');

const validatePlanet = () => {
    return [
        body('name')
            .trim()
            .isLength({ min: 1 }).withMessage('Please provide a valid name.'),
        body('starName')
            .trim()
            .isLength({ min: 1 }).withMessage('Please provide a valid star name.'),
        body('starDistance')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid distance in AU.'),
        body('mass')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid mass (relative to Earth).'),
        body('gravity')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid gravity (relative to Earth).'),
        body('moons')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid number of moons.'),
        body('day')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid day length (relative to Earth).'),
        body('year')
            .trim()
            .isNumeric()
            .isLength({ min: 1 }).withMessage('Please provide a valid year length (relative to Earth.')
    ]
}

const validateStar = () => {
    return [
        body('name')
            .trim()
            .isLength({ min: 1 }).withMessage('Please provide a valid name.'),
        body('distance')
            .trim()
            .isNumeric().withMessage('Please provide a valid distance in LY.')
            .isLength({ min: 1 }).withMessage('Please provide a valid distance in LY.'),
        body('radius')
            .trim()
            .isNumeric().withMessage('Please provide a valid radius (Solar Radius).')
            .isLength({ min: 1 }).withMessage('Please provide a valid radius (Solar Radius).'),
        body('mass')
            .trim()
            .isNumeric().withMessage('Please provide a valid mass (Solar Mass).')
            .isLength({ min: 1 }).withMessage('Please provide a valid mass (Solar Mass).'),
        body('spectralClass')
            .trim()
            .isLength({ min: 1 }).withMessage('Please provide a valid spectral class.')
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

module.exports = { validatePlanet, validateStar, validate }