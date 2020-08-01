const Sequelize = require('sequelize');
const config = require('./config');


const db = new Sequelize(
    config.dbname,
    config.dbuser,
    config.dbpassword,

    {
        host: config.dbhost,
        dialect: config.dbdialect,
        operatorAlises: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true
        }
    }
);
db.authenticate()
.then(() => console.log ("Connected to database server"))
.catch(err => console.log(err));

module.exports = db;

