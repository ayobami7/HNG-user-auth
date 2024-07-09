// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HNG-user-auth', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
