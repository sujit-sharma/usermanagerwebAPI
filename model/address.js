const Sequelize = require('sequelize');

const sequelize = require('../database');

const Address = sequelize.define('address', {
    // addressid: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    // },
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
Address.removeAttribute('id');


module.exports = Address;