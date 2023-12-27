"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var Sprint = connection_1.default.define("sprint", {
    idsprint: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isCorrectFormat: function (value) {
                if (!value.startsWith("Sprint #")) {
                    throw new Error('El título debe empezar con "Sprint #"');
                }
            },
        },
    },
    initialDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    finalDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    committedPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fulfilledPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    noFulfilledPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    toDoPorcentage: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    doingPorcentage: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    donePorcentage: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
});
exports.default = Sprint;
