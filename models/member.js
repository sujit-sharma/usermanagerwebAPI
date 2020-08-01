const Sequelize = require("sequelize");
const db = require('../database');

module.exports = db.define("member", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
//   gender: {
//       type: Sequelize.DataTypes.ENUM,
//       Values: ['Male', 'Female'],
//       allowNull: false
//   }
});
