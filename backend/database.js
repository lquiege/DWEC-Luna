const Sequelize = require('Sequelize');

const sequelize = new Sequelize("angularnode", "root", "", { dialect: "mysql", host: "localhost" });

module.exports = sequelize;