"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtaskStatus = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
var SubtaskStatus;
(function (SubtaskStatus) {
    SubtaskStatus["todo"] = "Por hacer";
    SubtaskStatus["doing"] = "Avanzada";
    SubtaskStatus["done"] = "Finalizada";
})(SubtaskStatus || (exports.SubtaskStatus = SubtaskStatus = {}));
class Subtask extends sequelize_1.Model {
}
Subtask.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idtask: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tasks',
            key: 'id',
        },
    },
    iduser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
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
        type: sequelize_1.DataTypes.ENUM(...Object.values(SubtaskStatus)),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'subtasks',
});
exports.default = Subtask;
