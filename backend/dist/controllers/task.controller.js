"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksBySprintId = exports.deleteTask = exports.putTask = exports.postTask = exports.getTasks = exports.getTask = void 0;
const task_1 = __importDefault(require("../models/task"));
const sprint_1 = __importDefault(require("../models/sprint"));
const models_1 = require("../models");
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found", id });
        }
        res.json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.getTask = getTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.findAll();
        res.json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.getTasks = getTasks;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield task_1.default.create(req.body);
        const idsprint = newTask.get('idsprint');
        //nuevos valores
        const expectedTime = newTask.get('expectedTime');
        const doneTime = newTask.get('doneTime');
        let conclusion = '';
        if (expectedTime > doneTime) {
            conclusion = 'Se requirio mas esfuerzo del esperado';
        }
        else if (expectedTime < doneTime) {
            conclusion = 'Se requirio menos esfuerzo del esperado';
        }
        else {
            conclusion = 'Se cumplio con el tiempo';
        }
        yield newTask.update({ conclutiontime: conclusion });
        if (idsprint) {
            const tasks = yield task_1.default.findAll({
                where: { idsprint: idsprint }
            });
            //puntos totales
            const committedPoints = tasks.reduce((total, task) => total + task.get('points'), 0);
            //Finalizada
            const fulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
            }, 0);
            //Avanzada
            const pendingPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
            }, 0);
            //Por hacer
            const noFulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
            }, 0);
            //Finalizada Porcentage
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
            const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            //Avanzada Porcentage
            const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
            const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
            //Por hacer Porcentage
            const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
            const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
            const sprint = yield sprint_1.default.findByPk(idsprint);
            if (sprint) {
                yield sprint.update({
                    committedPoints,
                    fulfilledPoints,
                    pendingPoints,
                    noFulfilledPoints,
                    toDoPorcentage,
                    doingPorcentage,
                    donePorcentage,
                });
                // New logic for prediction calculations
                const completedSprints = yield sprint_1.default.findAll({
                    where: { sprintstatus: 'Completado' }
                });
                if (completedSprints.length >= 5 && idsprint >= 6) {
                    const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints'));
                    const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
                    const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
                    const stdDev = Math.sqrt(variance);
                    const predictedPointsLower = Math.max(0, mean - stdDev);
                    const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
                    const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;
                    // Update sprint with prediction values
                    yield sprint.update({
                        predictedPointsLower,
                        predictedPointsUpper,
                        confidenceInterval
                    });
                }
            }
        }
        res.status(201).json(newTask);
        const userId = newTask.get('iduser');
        // Suponiendo que necesitas obtener el nombre completo del usuario de alguna forma
        // Si ya tienes el nombre completo almacenado en alguna parte, úsalo directamente
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userName = user.get('fullname'); // Asegúrate de que este campo exista en tu modelo de Usuario
        // Actualiza la tarea con el nuevo nombre y los datos del body
        yield newTask.update(Object.assign(Object.assign({}, req.body), { assignedFullName: userName }));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.postTask = postTask;
const putTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found", id });
        }
        yield task.update(req.body);
        //update por name
        const userId = task.get('iduser');
        // Suponiendo que necesitas obtener el nombre completo del usuario de alguna forma
        // Si ya tienes el nombre completo almacenado en alguna parte, úsalo directamente
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userName = user.get('fullname'); // Asegúrate de que este campo exista en tu modelo de Usuario
        // Actualiza la tarea con el nuevo nombre y los datos del body
        yield task.update(Object.assign(Object.assign({}, req.body), { assignedFullName: userName }));
        //nuevos valores
        const expectedTime = task.get('expectedTime');
        const doneTime = task.get('doneTime');
        let conclusion = '';
        if (expectedTime > doneTime) {
            conclusion = 'Se requirio mas esfuerzo del esperado';
        }
        else if (expectedTime < doneTime) {
            conclusion = 'Se requirio menos esfuerzo del esperado';
        }
        else {
            conclusion = 'Se cumplio con el tiempo';
        }
        yield task.update({ conclutiontime: conclusion });
        const idsprint = task.get('idsprint');
        if (idsprint) {
            const tasks = yield task_1.default.findAll({
                where: { idsprint: idsprint }
            });
            //puntos totales
            const committedPoints = tasks.reduce((total, task) => total + task.get('points'), 0);
            //Finalizada
            const fulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
            }, 0);
            //Avanzada
            const pendingPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
            }, 0);
            //Por hacer
            const noFulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
            }, 0);
            //Finalizada Porcentage
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
            const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            //Avanzada Porcentage
            const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
            const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
            //Por hacer Porcentage
            const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
            const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
            const sprint = yield sprint_1.default.findByPk(idsprint);
            if (sprint) {
                yield sprint.update({
                    committedPoints,
                    fulfilledPoints,
                    pendingPoints,
                    noFulfilledPoints,
                    toDoPorcentage,
                    doingPorcentage,
                    donePorcentage,
                });
                // New logic for prediction calculations
                const completedSprints = yield sprint_1.default.findAll({
                    where: { sprintstatus: 'Completado' }
                });
                if (completedSprints.length >= 5 && idsprint >= 6) {
                    const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints'));
                    const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
                    const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
                    const stdDev = Math.sqrt(variance);
                    const predictedPointsLower = Math.max(0, mean - stdDev);
                    const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
                    const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;
                    // Update sprint with prediction values
                    yield sprint.update({
                        predictedPointsLower,
                        predictedPointsUpper,
                        confidenceInterval
                    });
                }
            }
        }
        res.json({ msg: "Task updated", task });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.putTask = putTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found", id });
        }
        const idsprint = task.get('idsprint');
        yield task.destroy();
        if (idsprint) {
            const tasks = yield task_1.default.findAll({
                where: { idsprint: idsprint }
            });
            //puntos totales
            const committedPoints = tasks.reduce((total, task) => total + task.get('points'), 0);
            //Finalizada
            const fulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Finalizada' ? total + task.get('points') : total;
            }, 0);
            //Avanzada
            const pendingPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Avanzada' ? total + task.get('points') : total;
            }, 0);
            //Por hacer
            const noFulfilledPoints = tasks.reduce((total, task) => {
                return task.get('status') === 'Por hacer' ? total + task.get('points') : total;
            }, 0);
            //Finalizada Porcentage
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.get('status') === 'Finalizada').length;
            const donePorcentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            //Avanzada Porcentage
            const pendingTasks = tasks.filter(task => task.get('status') === 'Avanzada').length;
            const doingPorcentage = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;
            //Por hacer Porcentage
            const todoTasks = tasks.filter(task => task.get('status') === 'Por hacer').length;
            const toDoPorcentage = totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0;
            const sprint = yield sprint_1.default.findByPk(idsprint);
            if (sprint) {
                yield sprint.update({
                    committedPoints,
                    fulfilledPoints,
                    pendingPoints,
                    noFulfilledPoints,
                    toDoPorcentage,
                    doingPorcentage,
                    donePorcentage,
                });
                // New logic for prediction calculations
                const completedSprints = yield sprint_1.default.findAll({
                    where: { sprintstatus: 'Completado' }
                });
                if (completedSprints.length >= 5 && idsprint >= 6) {
                    const fulfilledPointsArray = completedSprints.map(s => s.get('fulfilledPoints'));
                    const mean = fulfilledPointsArray.reduce((acc, val) => acc + val, 0) / fulfilledPointsArray.length;
                    const variance = fulfilledPointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fulfilledPointsArray.length;
                    const stdDev = Math.sqrt(variance);
                    const predictedPointsLower = Math.max(0, mean - stdDev);
                    const predictedPointsUpper = Math.max(predictedPointsLower, mean + stdDev);
                    const confidenceInterval = `${predictedPointsLower} - ${predictedPointsUpper}`;
                    // Update sprint with prediction values
                    yield sprint.update({
                        predictedPointsLower,
                        predictedPointsUpper,
                        confidenceInterval
                    });
                }
            }
        }
        res.json({ msg: "Task deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.deleteTask = deleteTask;
const getTasksBySprintId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasks = yield task_1.default.findAll({
            where: { id }
        });
        res.json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.getTasksBySprintId = getTasksBySprintId;
