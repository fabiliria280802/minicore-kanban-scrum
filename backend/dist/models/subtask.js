"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var Subtask = connection_1.default.define("subtask", {
    idsubtask: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idtask: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tasks',
            key: 'idtask',
        },
    },
    iduser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'iduser',
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subtaskdescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subtaskstatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Subtask;
