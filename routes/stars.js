const router = require('express').Router();
const { validate, validateStar } = require('../middleware/validate');

const starsController = require('../controllers/starsController');

router.get('/', starsController.getAll);

router.get('/:id', starsController.getSingle);

router.post('/',
    validateStar(),
    validate,
    starsController.createStar
);

router.put('/:id', 
    validateStar(),
    validate,
    starsController.updateStar
);

router.delete('/:id', starsController.deleteStar);

module.exports = router;