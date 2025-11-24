const router = require('express').Router();
const { isAuth } = require('../middleware/authenticate');
const accountsController = require('../controllers/accountsController');

router.get('/', accountsController.getAll);
router.get('/:id', accountsController.getSingle);
router.post('/', isAuth, accountsController.createAccount);
router.put('/:id', isAuth, accountsController.updateAccount);
router.delete('/:id', isAuth, accountsController.deleteAccount);

module.exports = router;