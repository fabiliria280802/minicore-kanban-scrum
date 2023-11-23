"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var Task = connection_1.default.define('task', {
    idtask: {
        type: sequelize_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataType.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataType.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataType.STRING,
        allowNull: false
    },
    priority: {
        type: sequelize_1.DataType.STRING,
        allowNull: false
    },
    iduser: {
        type: sequelize_1.DataType.INTEGER,
        allowNull: false
    },
    idsprint: {
        type: sequelize_1.DataType.INTEGER,
        allowNull: false
    }
});
