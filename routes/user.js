const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');


const router = express.Router();

router.get('/',userController.getTest);

router.post('/signup', 
[
     body('username')
        .trim() 
    //     //.withMessage('Enter username without whitespaces')
       //  .isEmpty()
       ,

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
        
],
userController.postSignup
);

// router.post('/login', userController.postLogin);

module.exports = router;