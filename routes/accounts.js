const router = require('express').Router();
const accountsController = require('../controllers/accountsController');
const auth = require('../middleware/authenticate');

router.get('/' , accountsController.getAll);
router.get('/:id', accountsController.getSingle);
router.post('/', auth.isAuth, accountsController.createAccount);
router.put('/:id', auth.isAuth, accountsController.updateAccount);
router.delete('/:id', auth.isAuth, accountsController.deleteAccount);

module.exports = router;