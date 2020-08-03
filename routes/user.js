const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middlewares/is-auth');

const User = require('../models/user');
const userController = require('../controllers/user');


const router = express.Router();


//GET/api/user/:userId
router.get('/:userId', isAuth , userController.getUserDetail );


//PUT/api/user/update/:userId
router.put('/update/:userId' ,
[
    body('username')
       .trim(),

   body('email')
       .isEmail()
       .normalizeEmail(),
       

   body('password')
       .trim()
       .isLength({ min : 8 })
       .withMessage('Enter alphanumeric password with minimum 8 characters')
      // .isAlphanumeric()
       
], isAuth, userController.putUserUpdate );


//PUT/api/user/addmember/:userId
router.put('/addmember/:userId', 
[
    body('fname')
    .isString(),
    body('lname')
    .isString(),
    body('email')
    .isEmail()
    .normalizeEmail(),
    body('phone')
    .isNumeric(),
    body('provision')
    .isNumeric()
    .isLength({ min: 1, max: 7 }),
    body('district')
    .isString(),
    body('city')
    .isString()

], isAuth, userController.putNewMember);


//PUT/api/user/:userId/:memberId
router.put('/:userId/:memberId', 
[


], isAuth, userController.putMemberUpdate );


//DELETE/api/user/:userId/:memberId
router.delete('/:userId/:memberId', 
[


], isAuth, userController.deleteMember);


//get/api/user/:userId/members
router.get('/:userId/members',
[

], isAuth, userController.getAllMembers );

module.exports = router;