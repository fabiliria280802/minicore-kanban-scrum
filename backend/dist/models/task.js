"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriority = exports.TaskPoints = exports.TaskStatus = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["todo"] = "Por hacer";
    TaskStatus["doing"] = "Avanzada";
    TaskStatus["done"] = "Finalizada";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskPoints;
(function (TaskPoints) {
    TaskPoints[TaskPoints["none"] = 0] = "none";
    TaskPoints[TaskPoints["one"] = 1] = "one";
    TaskPoints[TaskPoints["three"] = 3] = "three";
    TaskPoints[TaskPoints["five"] = 5] = "five";
    TaskPoints[TaskPoints["eight"] = 8] = "eight";
    TaskPoints[TaskPoints["thirteen"] = 13] = "thirteen";
})(TaskPoints || (exports.TaskPoints = TaskPoints = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["low"] = "Baja";
    TaskPriority["medium"] = "Media";
    TaskPriority["high"] = "Alta";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
class Task extends sequelize_1.Model {
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idsprint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sprints',
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
    taskdescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(TaskStatus)),
        allowNull: false,
    },
    points: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[TaskPoints.none, TaskPoints.one, TaskPoints.three, TaskPoints.five, TaskPoints.eight, TaskPoints.thirteen]],
        },
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(TaskPriority)),
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
}, {
    sequelize: connection_1.default,
    modelName: 'tasks',
});
exports.default = Task;
