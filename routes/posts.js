const router = require('express').Router();
const validate = require('../middleware/validate');

const postsController = require('../controllers/posts');

router.get('/', postsController.getAll);

router.get('/:id', postsController.getSingle);

router.post(
    '/',
    validate.validatePost,
    handleErros(postsController.createPost)
);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;