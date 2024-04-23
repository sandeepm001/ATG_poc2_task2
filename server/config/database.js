// config/database.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('linkedin_scraper', 'root', 'process.env.DB_PASSWORD', {
    host: 'localhost',
    dialect: 'mysql',
    // Additional options here
});

module.exports = sequelize;
