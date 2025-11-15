const router = require('express').Router();
const { validate, validatePlanet } = require('../middleware/validate');

const planetsController = require('../controllers/planetsController');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

router.post('/',
    validatePlanet(),
    validate,
    planetsController.createPlanet
);

router.put('/:id',
    validatePlanet(),
    validate,
    planetsController.updatePlanet
);

router.delete('/:id', planetsController.deletePlanet);

module.exports = router;