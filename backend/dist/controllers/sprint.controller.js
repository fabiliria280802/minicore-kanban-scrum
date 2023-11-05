"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSprint = exports.putSprint = exports.postSprint = exports.getSprints = exports.getSprint = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getSprint = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM sprint WHERE idsprint = ?', id, function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getSprint = getSprint;
var getSprints = function (req, res) {
    connection_1.default.query('SELECT * FROM sprint', function (error, data) {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getSprints = getSprints;
var postSprint = function (req, res) {
    var body = req.body;
    var query = 'INSERT INTO sprint SET ?';
    connection_1.default.query(query, body, function (error, data) {
        if (error) {
            res.status(500).json({
                error: "Error al insertar usuario"
            });
        }
        else {
            res.json({
                msg: "sprint agregada con éxito"
            });
        }
    });
};
exports.postSprint = postSprint;
var putSprint = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE sprint SET ? WHERE idsprint =?';
    connection_1.default.query(query, [body, id], function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        }
        else {
            res.json({
                msg: "sprint updated"
            });
        }
    });
};
exports.putSprint = putSprint;
var deleteSprint = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM sprint WHERE idsprint = ?', id, function (error, result) {
        if (error)
            throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "sprint not found",
                id: id
            });
        }
        else {
            connection_1.default.query('DELETE FROM sprint WHERE idsprint = ?', id, function (deleteError, data) {
                if (deleteError)
                    throw deleteError;
                res.json({
                    msg: "sprint deleted"
                });
            });
        }
    });
};
exports.deleteSprint = deleteSprint;
