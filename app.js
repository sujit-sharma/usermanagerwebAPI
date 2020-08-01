const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');


// init app or server
const app = express();

app.use(bodyParser.json()); //for parsing application/json

//node js server 
const port = config.port || 8090;
app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Backend API Server started at ${config.hostIp} port :` + port);
});
//.catch(err => console.log(err));