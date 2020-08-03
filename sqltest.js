const sequelize = require('sequelize');
const User = require('./models/user');
const Member = require('./models/member');
const Address = require('./models/address');
const express = require('express');


const app = express();

const Sequel = require('./database');
//establishing database relations
User.hasMany(Member);
Member.hasOne(Address);

const port =  8090;
// synchronizing with database
Sequel.sync({ force: false }) 
    // starting node js server
    .then( app.listen(port, err => {
        if(err) console.log(err);

        console.log(`Backend API Server started at 8090 port :` + port);

        Member.create({
            lname: 'hari',
            fname : 'ram',
            email: 'sujit@dhakal.com', 
            phone: '9849722556'        
        },{
            include: [{ model: new Address ({ provision: '3', district: 'danh',city: 'ktm' })}]
        })


    })
    )
    .catch(err => console.log(err));
    


