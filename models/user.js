const Sequelize = require("sequelize");
const db = require('../database');

module.exports = db.define("user", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true

  },
   
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetTokenExpiry: {
    type: Sequelize.DATE,
    allowNull: true
  }
});
