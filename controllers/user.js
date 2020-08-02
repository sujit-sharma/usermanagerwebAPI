const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { v4 : uuid } = require('uuid');


const User = require('../models/user');

exports.getTest = (req, res) => {
    res.send('hello node');
}


exports.postSignup = (req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;

}
    const _id = uuid();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt
        .hash(password, 16)
        .then( hashedPasswd => {
            return User.create({id: _id, username: username, email: email, password: hashedPasswd });
        }) 
        .then(createdUser => {
            res.status(201).json({ message: 'User created', userId: createdUser.id})
        })
        .catch(err => {
            if (!err.statusCode ) {
                err.statusCode = 500;
            }
            next(err);
        });

}