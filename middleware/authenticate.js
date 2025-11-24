const isAuth = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ message: 'you do not have access' });
    }
    next();
};

module.exports = { isAuth };