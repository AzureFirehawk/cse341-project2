const router = require('express').Router();
const validate = require('../middleware/validate');

const starsController = require('../controllers/stars');

router.get('/', starsController.getAll);

router.get('/:id', starsController.getSingle);

router.post(
    '/',
    validate.validatePost,
    handleErros(starsController.createPost)
);

router.put('/:id', starsController.updatePost);

router.delete('/:id', starsController.deletePost);

module.exports = router;