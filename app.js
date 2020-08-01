const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');


//database requirements
const Sequel = require('./database');
const User = require('./model/user');
const Member = require('./model/member');
const Address = require('./model/address');

// init app or server
const app = express();

app.use(bodyParser.json()); //for parsing application/json

//establishing database relations
User.hasMany(Member);
Member.hasOne(Address);

const port = config.port || 8090;
// synchronizing with database
Sequel.sync({force: true}) 
    // starting node js server
    .then( app.listen(port, err => {
        if(err) console.log(err);
        console.log(`Backend API Server started at ${config.hostIp} port :` + port);
    })
    )
    .catch(err => console.log(err));
    
