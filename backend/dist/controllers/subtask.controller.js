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
exports.deleteSubtask = exports.putSubtask = exports.postSubtask = exports.getSubtasks = exports.getSubtask = void 0;
const subtask_1 = __importDefault(require("../models/subtask"));
const getSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subtask = yield subtask_1.default.findByPk(id);
        if (!subtask) {
            return res.status(404).json({ msg: "Subtask not found", id });
        }
        res.json(subtask);
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
exports.getSubtask = getSubtask;
const getSubtasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtasks = yield subtask_1.default.findAll();
        res.json(subtasks);
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
exports.getSubtasks = getSubtasks;
const postSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubtask = yield subtask_1.default.create(req.body);
        res.status(201).json(newSubtask);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error al insertar subtask" });
        }
    }
});
exports.postSubtask = postSubtask;
const putSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subtask = yield subtask_1.default.findByPk(id);
        if (!subtask) {
            return res.status(404).json({ msg: "Subtask not found", id });
        }
        yield subtask.update(req.body);
        res.json({ msg: "Subtask updated", subtask });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error al actualizar subtask" });
        }
    }
});
exports.putSubtask = putSubtask;
const deleteSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subtask = yield subtask_1.default.findByPk(id);
        if (!subtask) {
            return res.status(404).json({ msg: "Subtask not found", id });
        }
        yield subtask.destroy();
        res.json({ msg: "Subtask deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error al eliminar subtask" });
        }
    }
});
exports.deleteSubtask = deleteSubtask;
