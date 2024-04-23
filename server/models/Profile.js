// server/models/Profile.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    followerCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    connectionCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bioLine: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Profile;
