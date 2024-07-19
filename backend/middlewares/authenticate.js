const jwt = require('jsonwebtoken');
const config = require('../config');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};
