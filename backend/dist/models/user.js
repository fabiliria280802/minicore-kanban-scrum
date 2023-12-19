"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var User = connection_1.default.define('user', {
    iduser: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = User;
