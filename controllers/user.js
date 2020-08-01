const { ValidationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getTest = (req, res) => {
    res.send('hello node');



exports.postSignup = (req, res, next ) => {
const errors = ValidationResult(req);
if(!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;

}
const username = req.body.username;
const email = req.body.email;
const password = req.body.password;
bcrypt
    .hash(password, 16)
    .then( hashedPasswd => {
        return User.create({username: username, email: email, password: password });
    }) 
    .then(createdUser => {
        res.status(201).json({ message: 'User created', userId: createdUser.email})
    })
    .catch(err => {
        if (!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    });

}

}