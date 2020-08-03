const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');


const router = express.Router();


//GET/api/user/:userId
router.get('/:userId', userController.getUserDetail );


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
       
], userController.putUserUpdate );


//PUT/api/user/:userId/addmember
router.put('/:userId/addmember', 
[
    body('email')
    //.isEmail()
    .normalizeEmail(),

], userController.putNewMember);


//PUT/api/user/:userId/:memberId
router.put('/:userId/:memberId', 
[


],userController.putMemberUpdate );


//DELETE/api/user/:userId/:memberId
router.delete('/:userId/:memberId', 
[


], userController.deleteMember);


//get/api/user/:userId/members
router.get('/:userId/members',
[

], userController.getAllMembers );

module.exports = router;