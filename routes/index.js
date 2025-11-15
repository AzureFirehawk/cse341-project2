const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.use('/stars', require('./stars'));

router.use('/planets', require('./planets'));

module.exports = router;