"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var Task = connection_1.default.define("task", {
    idtask: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idsprint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sprints',
            key: 'idsprint',
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
    taskdescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    points: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    priority: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expectedTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    doneTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    conclutiontime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    assignedFullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.default = Task;
