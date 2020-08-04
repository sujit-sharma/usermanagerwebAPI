const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/is-auth');
const User = require('../models/user');
const authController = require('../controllers/auth');


const router = express.Router();

//POST/api/auth/signup
router.post('/signup', 
[
     body('username')
        .trim()
        .custom((value, { req }) => {
            return User.findOne({
                where: { username: value }
            })
            .then(user => {
                if (user ) {
                    return Promise.reject('Username address already exist');
                }
            })
        }),

    body('email')
        .isEmail()
        .normalizeEmail()
        .custom((value , { req }) => {
            return User.findOne({
                attributes: ['email'],
                where: {
                    email: value
    }
                })
            .then(user => {
                if(user) {
                    return Promise.reject('Email address already exist');
                }
            })
        })
        .withMessage('Please enter a valid email'),

    body('password')
        .trim()
        .isLength({ min : 8 })
        .withMessage('Enter alphanumeric password with minimum 8 characters')
       // .isAlphanumeric()
        
], authController.postSignup );


//POST/api/auth/login
router.post('/login', authController.postLogin );

//POST/api/auth/logout/:userId
router.post('/logout/:userId', isAuth, authController.postLogout );


module.exports = router;