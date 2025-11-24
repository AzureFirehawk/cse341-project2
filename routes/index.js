const router = require('express').Router();
const passport = require('passport');

router.use('/stars', require('./stars'));
router.use('/planets', require('./planets'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;