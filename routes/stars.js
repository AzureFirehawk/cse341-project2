const router = require('express').Router();
const validate = require('../middleware/validate');

const starsController = require('../controllers/stars');

router.get('/', starsController.getAll);

router.get('/:id', starsController.getSingle);

router.post(
    '/',
    validate.validatePost,
    handleErrors(starsController.createStar)
);

router.put('/:id', starsController.updateStar);

router.delete('/:id', starsController.deleteStar);

module.exports = router;