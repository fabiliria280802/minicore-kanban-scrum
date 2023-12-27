"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("minicore-kanban-scrum", "root", "28081409", {
    host: "localhost",
    dialect: "mysql",
});
//const connection = mysql.createConnection(keys);
//export default connection;
exports.default = sequelize;
