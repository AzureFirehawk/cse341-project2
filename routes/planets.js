const router = require('express').Router();
const { validate, validatePlanet } = require('../middleware/validate');
const { isAuth } = require('../middleware/authenticate');

const planetsController = require('../controllers/planetsController');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

router.post('/', isAuth,
    validatePlanet(),
    validate,
    planetsController.createPlanet
);

router.put('/:id', isAuth,
    validatePlanet(),
    validate,
    planetsController.updatePlanet
);

router.delete('/:id', isAuth, planetsController.deletePlanet);

module.exports = router;