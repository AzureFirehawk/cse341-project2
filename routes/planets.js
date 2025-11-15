const router = require('express').Router();
const validate = require('../middleware/validate');

const planetsController = require('../controllers/planets');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

router.post(
    '/',
    validate.validatePost,
    handleErros(planetsController.createPost)
);

router.put('/:id', planetsController.updatePost);

router.delete('/:id', planetsController.deletePost);

module.exports = router;