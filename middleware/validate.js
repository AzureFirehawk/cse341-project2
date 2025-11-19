const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

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
            .isNumeric().withMessage('Distance must be a number (AU).')
            .isLength({ min: 1 }).withMessage('Please provide a valid distance in AU.'),
        body('mass')
            .trim()
            .isNumeric().withMessage('Mass must be a number (relative to Earth).')
            .isLength({ min: 1 }).withMessage('Please provide a valid mass (relative to Earth).'),
        body('gravity')
            .trim()
            .isNumeric().withMessage('Gravity must be a number (relative to Earth).')
            .isLength({ min: 1 }).withMessage('Please provide a valid gravity (relative to Earth).'),
        body('moons')
            .trim()
            .isNumeric().withMessage('Number of moons must be a number.')
            .isLength({ min: 1 }).withMessage('Please provide a valid number of moons.'),
        body('day')
            .trim()
            .isNumeric().withMessage('Day length must be a number (relative to Earth days).')
            .isLength({ min: 1 }).withMessage('Please provide a valid day length (relative to Earth).'),
        body('year')
            .trim()
            .isNumeric().withMessage('Year length must be a number (relative to Earth years).')
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
            .isNumeric().withMessage('Distance must be a number (LY).')
            .isLength({ min: 1 }).withMessage('Please provide a valid distance in LY.'),
        body('radius')
            .trim()
            .isNumeric().withMessage('Solar Radius must be a number.')
            .isLength({ min: 1 }).withMessage('Please provide a valid radius (Solar Radius).'),
        body('mass')
            .trim()
            .isNumeric().withMessage('Solar Mass must be a number.')
            .isLength({ min: 1 }).withMessage('Please provide a valid mass (Solar Mass).'),
        body('spectralClass')
            .trim()
            .isLength({ min: 1 }).withMessage('Please provide a valid spectral class.')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = createError(422, "Validation Failed");
        err.data = errors.array();
        return next(err);
    }
    next();
}

module.exports = { validatePlanet, validateStar, validate }