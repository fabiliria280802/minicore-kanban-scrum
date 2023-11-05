"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.putTask = exports.postTask = exports.getTasks = exports.getTask = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getTask = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM task WHERE idtask = ?', id, function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getTask = getTask;
var getTasks = function (req, res) {
    connection_1.default.query('SELECT * FROM task', function (error, data) {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getTasks = getTasks;
var postTask = function (req, res) {
    var body = req.body;
    var query = 'INSERT INTO task SET ?';
    connection_1.default.query(query, body, function (error, data) {
        if (error) {
            res.status(500).json({
                error: "Error al insertar task"
            });
        }
        else {
            res.json({
                msg: "task agregada con éxito"
            });
        }
    });
};
exports.postTask = postTask;
var putTask = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE task SET ? WHERE idtask =?';
    connection_1.default.query(query, [body, id], function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        }
        else {
            res.json({
                msg: "task updated"
            });
        }
    });
};
exports.putTask = putTask;
var deleteTask = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM task WHERE idtask = ?', id, function (error, result) {
        if (error)
            throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "task not found",
                id: id
            });
        }
        else {
            connection_1.default.query('DELETE FROM task WHERE idtask = ?', id, function (deleteError, data) {
                if (deleteError)
                    throw deleteError;
                res.json({
                    msg: "task deleted"
                });
            });
        }
    });
};
exports.deleteTask = deleteTask;
