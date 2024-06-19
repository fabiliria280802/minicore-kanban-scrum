"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintStatus = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
var SprintStatus;
(function (SprintStatus) {
    SprintStatus["toStart"] = "Por iniciar";
    SprintStatus["initialize"] = "Iniciado";
    SprintStatus["completed"] = "Completado";
})(SprintStatus || (exports.SprintStatus = SprintStatus = {}));
class Sprint extends sequelize_1.Model {
}
Sprint.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isCorrectFormat(value) {
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
    pendingPoints: {
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
    sprintstatus: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(SprintStatus)),
        allowNull: true,
    },
    predictedPointsLower: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    predictedPointsUpper: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    confidenceInterval: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'sprints',
});
exports.default = Sprint;
