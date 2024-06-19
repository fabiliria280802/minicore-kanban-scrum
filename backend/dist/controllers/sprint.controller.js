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
exports.deleteSprint = exports.putSprint = exports.postSprint = exports.getSprints = exports.getSprint = void 0;
const sprint_1 = __importDefault(require("../models/sprint"));
const getSprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sprint = yield sprint_1.default.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        res.json(sprint);
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
exports.getSprint = getSprint;
const getSprints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprints = yield sprint_1.default.findAll();
        res.json(sprints);
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
exports.getSprints = getSprints;
const postSprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, initialDate, finalDate } = req.body;
    try {
        const startDate = new Date(initialDate);
        const endDate = new Date(finalDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res
                .status(400)
                .json({ error: "Las fechas proporcionadas no son válidas." });
        }
        if (endDate <= startDate) {
            return res
                .status(400)
                .json({
                error: "La fecha final no puede ser anterior o igual a la fecha inicial.",
            });
        }
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        if (dayDiff > 15) {
            return res
                .status(400)
                .json({
                error: "La diferencia entre la fecha inicial y final no puede ser mayor a 15 días.",
            });
        }
        const newSprint = yield sprint_1.default.create(req.body);
        res.status(201).json(newSprint);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error al insertar sprint" });
        }
    }
});
exports.postSprint = postSprint;
//TODO: NUEVA VALIDACION
const putSprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("Update Sprint ID:", id);
        console.log("Data to Update:", req.body);
        // Actualizar el sprint
        const sprint = yield sprint_1.default.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        yield sprint.update(req.body);
        console.log("Updated Sprint:", sprint);
        res.json({ msg: "Sprint updated", sprint });
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Error al actualizar sprint" });
    }
});
exports.putSprint = putSprint;
const deleteSprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sprint = yield sprint_1.default.findByPk(id);
        if (!sprint) {
            return res.status(404).json({ msg: "Sprint not found", id });
        }
        yield sprint.destroy();
        res.json({ msg: "Sprint deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error al eliminar sprint" });
        }
    }
});
exports.deleteSprint = deleteSprint;
