require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
