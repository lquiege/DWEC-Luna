const Sequelize = require('sequelize');

const sequelize = require('./database');

const Game = sequelize.define('game', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    console: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Game;