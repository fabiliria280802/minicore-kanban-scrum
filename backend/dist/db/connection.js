"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var sequelize_1 = require("sequelize");
var dbHost = process.env.DB_HOST || 'bvqarnycdzwzhelzirlo-mysql.services.clever-cloud.com';
var dbUser = process.env.DB_USER || 'uraaehwcpsexoszv';
var dbPassword = process.env.DB_PASSWORD || 'AhifG2DdVi4bmvIKfJBe';
var dbName = process.env.DB_NAME || 'bvqarnycdzwzhelzirlo';
var dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
var sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
