const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { v4 : uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config');


const User = require('../models/user');


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
            res.status(201).json({ message: 'User created', userId: createdUser.id.toString() })
        })
        .catch(err => {
            if (!err.statusCode ) {
                err.statusCode = 500;
            }
            next(err);
        });
}
exports.postLogin = (req, res, next ) => {
    const username = req.body.username;
    const password = req.body.password;
    let validUser;
    User.findOne({
        where: { 
            username: username            
        }
    })
    
    .then(user => {
        if(!user) {
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }
        validUser = user;
        return bcrypt.compare(password, validUser.password);
    })
    .then(isEqual => {
        if (! isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
              username: validUser.username,
              userId: validUser.id.toString()
            },
                config.jwtsecuritykey,
            { expiresIn: '1h' }
          );

        res.status(200).json({ message: 'Login Sucess', token: token, userId: validUser.id.toString() })
    })
    .catch(err => {
        if (!err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    });
}


exports.postLogout = (req, res, next ) => {
    const userId = req.params.userId;
    if(userId !== req.userId ) {
        const error = new Error('Not authorized');
        error.statusCode = 403;
        throw error;
    }
        
        res.status(200).json({ message: 'Logout Sucess delete the token from client side' })
   
}