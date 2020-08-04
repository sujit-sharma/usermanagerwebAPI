const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


const User = require('../models/user');
const Member = require('../models/member');
const Address = require('../models/address');



exports.getUserDetail = (req, res, next ) => {

    const userId = req.userId;

    User.findOne({
        where: {
            id: userId
        }
    })
    .then(userdetail => {
        if (!userdetail) {
            const error = new Error('User does not exist');
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({ message: 'User detail received' , userdetail : userdetail })
    })
    .catch(err =>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })


}
exports.putUserUpdate = (req, res, next ) => {
    const userId = req.userId;
    const errors = validationResult(req);
    if( !errors.isEmpty ()) {
        const error = new Error('Validation failed , enter correct data');
        error.statusCode =422;
        throw error;
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        where: {
            id: userId
        }
    })
    .then(user => {
        if(!user ) {
            const error = new Error('User Does not exist');
            error.statusCode = 404;
            throw err;
        }
        return bcrypt.hash(password, 16)
    })
    .then(hashedPasswd => {
            return User.update({   email: email,
                                    username: username,
                                    password: hashedPasswd
                }, {
                where: { id : userId }
                })
            })
     
    .then(updatedUser => {
            res.status(200).json({ message: 'User update successfully'});
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });

} 

exports.putNewMember = (req, res, next ) => {
    const userId = req.userId.toString();
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const provision = req.body.provision;
    const district = req.body.district;
    const city = req.body.city;
   
        
    Member.findOne({
            where:  { email: email }
        })
        .then(member => {
            if (member ) {
                const error = new Error('Member already exist ');
                error.statusCode = 203;
                throw error;

            }
        return Address.create({
            provision: provision,
            district: district,
            city: city 

            })
        })
        .then(address => {
             Member.create({
                lname: lname,
                fname :fname,
                email: email, 
                phone: phone,
                addressId : address.id,
                userId :   userId
            })
            .then(result => {
                res.status(200).json({ message: 'Member added successfully',  result ,address: address});
        })
        .catch(err => {
            if( err ){
                const error = new Error('Error in database');
                error.statusCode =422;
                throw error;
            }
            
        })

     
    })
           
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

}

exports.putMemberUpdate = (req, res, next ) => {
    const userId = req.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const provision = req.body.provision;
    const district = req.body.district;
    const city = req.body.city;
    const memberId = req.body.memberId;
    
    let onemember;

    Member.findOne({
        where: {
            id: memberId
        }
    })
    .then(member => {
        if( !member) {
            const error = new Error(' Member doesnot exixt ');
            error.statusCode = 401;
            throw error;

        }
        onemember = member;
       return Address.update({provision: provision, district: district,city: city, where: { id : '3' }})

    })
    .then(address => {
       Member.update({
            lname: lname,
            fname :fname,
            email: email, 
            phone: phone        
        })
        .then(result => {
            res.status(200).json({ message: 'Member updated successfully',  result, address: address });
          })       

    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

}

exports.deleteMember = (req, res, next )=> {
    const userId = req.userId;
    const memberId = req.params.memberId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
  }
  Member.findOne({ 
      where: { id : memberId }
  })
  .then(member => {
    if( !member) {
        const error = new Error('Member does not exist');
        error.statusCode = 401;
        throw error;

    }
    return Member.destroy({
            where: { id: memberId}
        })

    })
    .then(result => {
        console.log(result);
        res.status(200).json({ message: 'Deleted member' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });


}

exports.getAllMembers = (req, res, next ) => {
    const userId = req.userId;
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
     }
        Member.findAll({
              where: { userId : userId }
          })
          .then(members => {
              if(!members ){
                const error = new Error('User does not have any member');
                error.statusCode = 200;
                throw error;

              }
            res.status(200).json({ message: 'member loaded sussfully', members: members, address: address });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });

}