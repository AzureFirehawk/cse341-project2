const router = require('express').Router();
const { validate, validateStar } = require('../middleware/validate');
const { isAuth } = require('../middleware/authenticate');

const starsController = require('../controllers/starsController');

router.get('/', starsController.getAll);

router.get('/:id', starsController.getSingle);

router.post('/', isAuth,
    validateStar(),
    validate,
    starsController.createStar
);

router.put('/:id', isAuth,
    validateStar(),
    validate,
    starsController.updateStar
);

router.delete('/:id', isAuth, starsController.deleteStar);

module.exports = router;