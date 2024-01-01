"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Sprint = exports.Subtask = exports.Task = void 0;
var task_1 = __importDefault(require("./task"));
exports.Task = task_1.default;
var subtask_1 = __importDefault(require("./subtask"));
exports.Subtask = subtask_1.default;
var sprint_1 = __importDefault(require("./sprint"));
exports.Sprint = sprint_1.default;
var user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
// Configuración de relaciones
task_1.default.belongsTo(user_1.default, { foreignKey: 'iduser' });
task_1.default.belongsTo(sprint_1.default, { foreignKey: 'idsprint' });
subtask_1.default.belongsTo(task_1.default, { foreignKey: 'idtask' });
subtask_1.default.belongsTo(user_1.default, { foreignKey: 'iduser' });
