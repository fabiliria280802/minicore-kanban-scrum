"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var Subtask = connection_1.default.define('subtask', {
    idsubtask: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    idtask: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    assignedUser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.default = Subtask;
