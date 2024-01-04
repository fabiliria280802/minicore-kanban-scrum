"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../db/connection"));
var sequelize_1 = require("sequelize");
var Prediction = connection_1.default.define("prediction", {
    idprediction: {
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
    predictedPointsLower: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    predictedPointsUpper: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    confidenceInterval: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Prediction;
