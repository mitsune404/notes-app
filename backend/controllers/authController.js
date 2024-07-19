const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
