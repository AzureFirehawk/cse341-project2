const router = require('express').Router();
const validate = require('../middleware/validate');

const planetsController = require('../controllers/planets');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

router.post(
    '/',
    validate.validatePlanet,
    handleErrors(planetsController.createPlanet)
);

router.put('/:id', planetsController.updatePlanet);

router.delete('/:id', planetsController.deletePlanet);

module.exports = router;