"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var sequelize_1 = require("sequelize");
var dbHost = process.env.DB_HOST || 'Gambito';
var dbUser = process.env.DB_USER || 'Rogue';
var dbPassword = process.env.DB_PASSWORD || 'Logan';
var dbName = process.env.DB_NAME || 'Mystique';
var dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
var sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
