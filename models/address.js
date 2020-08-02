const Sequelize = require('sequelize');

const sequelize = require('../database');

const Address = sequelize.define('address', {

    provision : {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {min: 1, max: 7},
    },
    district: {
        type: Sequelize.STRING,
    },
    city: {
        type : Sequelize.STRING
    },

});


module.exports = Address;