"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksBySprintId = exports.deleteTask = exports.putTask = exports.postTask = exports.getTasks = exports.getTask = void 0;
var task_1 = __importDefault(require("../models/task"));
var sprint_1 = __importDefault(require("../models/sprint"));
var models_1 = require("../models");
var getTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, task_1.default.findByPk(id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    return [2 /*return*/, res.status(404).json({ msg: "Task not found", id: id })];
                }
                res.json(task);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    res.status(500).json({ error: error_1.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTask = getTask;
var getTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_1.default.findAll()];
            case 1:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).json({ error: error_2.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTasks = getTasks;
var postTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newTask, idsprint, expectedTime, doneTime, conclusion, tasks, committedPoints, fulfilledPoints, pendingPoints, noFulfilledPoints, totalTasks, completedTasks, donePorcentage, pendingTasks, doingPorcentage, todoTasks, toDoPorcentage, sprint, completedSprints, fulfilledPointsArray, mean_1, variance, stdDev, predictedPointsLower, predictedPointsUpper, confidenceInterval, userId, user, userName, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, task_1.default.create(req.body)];
            case 1:
                newTask = _a.sent();
                idsprint = newTask.get('idsprint');
                expectedTime = newTask.get('expectedTime');
                doneTime = newTask.get('doneTime');
                conclusion = '';
                if (expectedTime > doneTime) {
                    conclusion = 'Se requirio mas esfuerzo del esperado';
                }
                else if (expectedTime < doneTime) {
                    conclusion = 'Se requirio menos esfuerzo del esperado';
                }
                else {
                    conclusion = 'Se cumplio con el tiempo';
                }
                return [4 /*yield*/, newTask.update({ conclutiontime: conclusion })];
            case 2:
                _a.sent();
                if (!idsprint) return [3 /*break*/, 8];
                return [4 /*yield*/, task_1.default.findAll({
                        where: { idsprint: idsprint }
                    })];
            case 3:
                tasks = _a.sent();
                committedPoints = tasks.reduce(function (total, task) { return total + task.get('points'); }, 0);
                fulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
                }, 0);
                pendingPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
                }, 0);
                noFulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
                }, 0);
                totalTasks = tasks.length;
                completedTasks = tasks.filter(function (task) { return task.get('status') === 'Finalizada'; }).length;
                donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                pendingTasks = tasks.filter(function (task) { return task.get('status') === 'Avanzada'; }).length;
                doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
                todoTasks = tasks.filter(function (task) { return task.get('status') === 'Por hacer'; }).length;
                toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
                return [4 /*yield*/, sprint_1.default.findByPk(idsprint)];
            case 4:
                sprint = _a.sent();
                if (!sprint) return [3 /*break*/, 8];
                return [4 /*yield*/, sprint.update({
                        committedPoints: committedPoints,
                        fulfilledPoints: fulfilledPoints,
                        pendingPoints: pendingPoints,
                        noFulfilledPoints: noFulfilledPoints,
                        toDoPorcentage: toDoPorcentage,
                        doingPorcentage: doingPorcentage,
                        donePorcentage: donePorcentage,
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, sprint_1.default.findAll({
                        where: { sprintstatus: 'Completado' }
                    })];
            case 6:
                completedSprints = _a.sent();
                if (!(completedSprints.length >= 5 && idsprint >= 6)) return [3 /*break*/, 8];
                fulfilledPointsArray = completedSprints.map(function (s) { return s.get('fulfilledPoints'); });
                mean_1 = fulfilledPointsArray.reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length;
                variance = fulfilledPointsArray.reduce(function (acc, val) { return acc + Math.pow(val - mean_1, 2); }, 0) / fulfilledPointsArray.length;
                stdDev = Math.sqrt(variance);
                predictedPointsLower = Math.max(0, mean_1 - stdDev);
                predictedPointsUpper = Math.max(predictedPointsLower, mean_1 + stdDev);
                confidenceInterval = "".concat(predictedPointsLower, " - ").concat(predictedPointsUpper);
                // Update sprint with prediction values
                return [4 /*yield*/, sprint.update({
                        predictedPointsLower: predictedPointsLower,
                        predictedPointsUpper: predictedPointsUpper,
                        confidenceInterval: confidenceInterval
                    })];
            case 7:
                // Update sprint with prediction values
                _a.sent();
                _a.label = 8;
            case 8:
                res.status(201).json(newTask);
                userId = newTask.get('iduser');
                return [4 /*yield*/, models_1.User.findByPk(userId)];
            case 9:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                }
                userName = user.get('fullname');
                // Actualiza la tarea con el nuevo nombre y los datos del body
                return [4 /*yield*/, newTask.update(__assign(__assign({}, req.body), { assignedFullName: userName }))];
            case 10:
                // Actualiza la tarea con el nuevo nombre y los datos del body
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    res.status(500).json({ error: error_3.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.postTask = postTask;
var putTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, userId, user, userName, expectedTime, doneTime, conclusion, idsprint, tasks, committedPoints, fulfilledPoints, pendingPoints, noFulfilledPoints, totalTasks, completedTasks, donePorcentage, pendingTasks, doingPorcentage, todoTasks, toDoPorcentage, sprint, completedSprints, fulfilledPointsArray, mean_2, variance, stdDev, predictedPointsLower, predictedPointsUpper, confidenceInterval, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                id = req.params.id;
                return [4 /*yield*/, task_1.default.findByPk(id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    return [2 /*return*/, res.status(404).json({ msg: "Task not found", id: id })];
                }
                return [4 /*yield*/, task.update(req.body)];
            case 2:
                _a.sent();
                userId = task.get('iduser');
                return [4 /*yield*/, models_1.User.findByPk(userId)];
            case 3:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                }
                userName = user.get('fullname');
                // Actualiza la tarea con el nuevo nombre y los datos del body
                return [4 /*yield*/, task.update(__assign(__assign({}, req.body), { assignedFullName: userName }))];
            case 4:
                // Actualiza la tarea con el nuevo nombre y los datos del body
                _a.sent();
                expectedTime = task.get('expectedTime');
                doneTime = task.get('doneTime');
                conclusion = '';
                if (expectedTime > doneTime) {
                    conclusion = 'Se requirio mas esfuerzo del esperado';
                }
                else if (expectedTime < doneTime) {
                    conclusion = 'Se requirio menos esfuerzo del esperado';
                }
                else {
                    conclusion = 'Se cumplio con el tiempo';
                }
                return [4 /*yield*/, task.update({ conclutiontime: conclusion })];
            case 5:
                _a.sent();
                idsprint = task.get('idsprint');
                if (!idsprint) return [3 /*break*/, 11];
                return [4 /*yield*/, task_1.default.findAll({
                        where: { idsprint: idsprint }
                    })];
            case 6:
                tasks = _a.sent();
                committedPoints = tasks.reduce(function (total, task) { return total + task.get('points'); }, 0);
                fulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
                }, 0);
                pendingPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
                }, 0);
                noFulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
                }, 0);
                totalTasks = tasks.length;
                completedTasks = tasks.filter(function (task) { return task.get('status') === 'Finalizada'; }).length;
                donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                pendingTasks = tasks.filter(function (task) { return task.get('status') === 'Avanzada'; }).length;
                doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
                todoTasks = tasks.filter(function (task) { return task.get('status') === 'Por hacer'; }).length;
                toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
                return [4 /*yield*/, sprint_1.default.findByPk(idsprint)];
            case 7:
                sprint = _a.sent();
                if (!sprint) return [3 /*break*/, 11];
                return [4 /*yield*/, sprint.update({
                        committedPoints: committedPoints,
                        fulfilledPoints: fulfilledPoints,
                        pendingPoints: pendingPoints,
                        noFulfilledPoints: noFulfilledPoints,
                        toDoPorcentage: toDoPorcentage,
                        doingPorcentage: doingPorcentage,
                        donePorcentage: donePorcentage,
                    })];
            case 8:
                _a.sent();
                return [4 /*yield*/, sprint_1.default.findAll({
                        where: { sprintstatus: 'Completado' }
                    })];
            case 9:
                completedSprints = _a.sent();
                if (!(completedSprints.length >= 5 && idsprint >= 6)) return [3 /*break*/, 11];
                fulfilledPointsArray = completedSprints.map(function (s) { return s.get('fulfilledPoints'); });
                mean_2 = fulfilledPointsArray.reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length;
                variance = fulfilledPointsArray.reduce(function (acc, val) { return acc + Math.pow(val - mean_2, 2); }, 0) / fulfilledPointsArray.length;
                stdDev = Math.sqrt(variance);
                predictedPointsLower = Math.max(0, mean_2 - stdDev);
                predictedPointsUpper = Math.max(predictedPointsLower, mean_2 + stdDev);
                confidenceInterval = "".concat(predictedPointsLower, " - ").concat(predictedPointsUpper);
                // Update sprint with prediction values
                return [4 /*yield*/, sprint.update({
                        predictedPointsLower: predictedPointsLower,
                        predictedPointsUpper: predictedPointsUpper,
                        confidenceInterval: confidenceInterval
                    })];
            case 10:
                // Update sprint with prediction values
                _a.sent();
                _a.label = 11;
            case 11:
                res.json({ msg: "Task updated", task: task });
                return [3 /*break*/, 13];
            case 12:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    res.status(500).json({ error: error_4.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.putTask = putTask;
var deleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, idsprint, tasks, committedPoints, fulfilledPoints, pendingPoints, noFulfilledPoints, totalTasks, completedTasks, donePorcentage, pendingTasks, doingPorcentage, todoTasks, toDoPorcentage, sprint, completedSprints, fulfilledPointsArray, mean_3, variance, stdDev, predictedPointsLower, predictedPointsUpper, confidenceInterval, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                id = req.params.id;
                return [4 /*yield*/, task_1.default.findByPk(id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    return [2 /*return*/, res.status(404).json({ msg: "Task not found", id: id })];
                }
                idsprint = task.get('idsprint');
                return [4 /*yield*/, task.destroy()];
            case 2:
                _a.sent();
                if (!idsprint) return [3 /*break*/, 8];
                return [4 /*yield*/, task_1.default.findAll({
                        where: { idsprint: idsprint }
                    })];
            case 3:
                tasks = _a.sent();
                committedPoints = tasks.reduce(function (total, task) { return total + task.get('points'); }, 0);
                fulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
                }, 0);
                pendingPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
                }, 0);
                noFulfilledPoints = tasks.reduce(function (total, task) {
                    return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
                }, 0);
                totalTasks = tasks.length;
                completedTasks = tasks.filter(function (task) { return task.get('status') === 'Finalizada'; }).length;
                donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                pendingTasks = tasks.filter(function (task) { return task.get('status') === 'Avanzada'; }).length;
                doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
                todoTasks = tasks.filter(function (task) { return task.get('status') === 'Por hacer'; }).length;
                toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
                return [4 /*yield*/, sprint_1.default.findByPk(idsprint)];
            case 4:
                sprint = _a.sent();
                if (!sprint) return [3 /*break*/, 8];
                return [4 /*yield*/, sprint.update({
                        committedPoints: committedPoints,
                        fulfilledPoints: fulfilledPoints,
                        pendingPoints: pendingPoints,
                        noFulfilledPoints: noFulfilledPoints,
                        toDoPorcentage: toDoPorcentage,
                        doingPorcentage: doingPorcentage,
                        donePorcentage: donePorcentage,
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, sprint_1.default.findAll({
                        where: { sprintstatus: 'Completado' }
                    })];
            case 6:
                completedSprints = _a.sent();
                if (!(completedSprints.length >= 5 && idsprint >= 6)) return [3 /*break*/, 8];
                fulfilledPointsArray = completedSprints.map(function (s) { return s.get('fulfilledPoints'); });
                mean_3 = fulfilledPointsArray.reduce(function (acc, val) { return acc + val; }, 0) / fulfilledPointsArray.length;
                variance = fulfilledPointsArray.reduce(function (acc, val) { return acc + Math.pow(val - mean_3, 2); }, 0) / fulfilledPointsArray.length;
                stdDev = Math.sqrt(variance);
                predictedPointsLower = Math.max(0, mean_3 - stdDev);
                predictedPointsUpper = Math.max(predictedPointsLower, mean_3 + stdDev);
                confidenceInterval = "".concat(predictedPointsLower, " - ").concat(predictedPointsUpper);
                // Update sprint with prediction values
                return [4 /*yield*/, sprint.update({
                        predictedPointsLower: predictedPointsLower,
                        predictedPointsUpper: predictedPointsUpper,
                        confidenceInterval: confidenceInterval
                    })];
            case 7:
                // Update sprint with prediction values
                _a.sent();
                _a.label = 8;
            case 8:
                res.json({ msg: "Task deleted" });
                return [3 /*break*/, 10];
            case 9:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    res.status(500).json({ error: error_5.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
var getTasksBySprintId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tasks, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, task_1.default.findAll({
                        where: { id: id }
                    })];
            case 1:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                if (error_6 instanceof Error) {
                    res.status(500).json({ error: error_6.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTasksBySprintId = getTasksBySprintId;
