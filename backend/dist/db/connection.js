"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const sequelize_1 = require("sequelize");
const dbHost = process.env.DB_HOST || 'Gambito';
const dbUser = process.env.DB_USER || 'Rogue';
const dbPassword = process.env.DB_PASSWORD || 'Logan';
const dbName = process.env.DB_NAME || 'Mystique';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
