"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubtask = exports.putSubtask = exports.postSubtask = exports.getSubtasks = exports.getSubtask = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getSubtask = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM subtask WHERE idsubtask = ?', id, function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "Subtask not found",
                id: id
            });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getSubtask = getSubtask;
var getSubtasks = function (req, res) {
    connection_1.default.query('SELECT * FROM subtask', function (error, data) {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getSubtasks = getSubtasks;
var postSubtask = function (req, res) {
    var body = req.body;
    var query = 'INSERT INTO subtask SET ?';
    connection_1.default.query(query, body, function (error, data) {
        if (error) {
            res.status(500).json({
                error: "Error al insertar subtask"
            });
        }
        else {
            res.json({
                msg: "subtask agregada con éxito"
            });
        }
    });
};
exports.postSubtask = postSubtask;
var putSubtask = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE subtask SET ? WHERE idsubtask =?';
    connection_1.default.query(query, [body, id], function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "subtask not found",
                id: id
            });
        }
        else {
            res.json({
                msg: "subtask updated"
            });
        }
    });
};
exports.putSubtask = putSubtask;
var deleteSubtask = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM subtask WHERE idsubtask = ?', id, function (error, result) {
        if (error)
            throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "subtask not found",
                id: id
            });
        }
        else {
            connection_1.default.query('DELETE FROM subtask WHERE idsubtask = ?', id, function (deleteError, data) {
                if (deleteError)
                    throw deleteError;
                res.json({
                    msg: "subtask deleted"
                });
            });
        }
    });
};
exports.deleteSubtask = deleteSubtask;
