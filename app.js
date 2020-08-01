const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');


// importing routes
const userRoutes = require('./routes/user');
//database requirements
const Sequel = require('./database');
const User = require('./models/user');
const Member = require('./models/member');
const Address = require('./models/address');

// init app or server
const app = express();

app.use(bodyParser.json()); //for parsing application/json

// http methods allowed by this API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/user', userRoutes); // userRoutes as handler for /user routes

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

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
    
