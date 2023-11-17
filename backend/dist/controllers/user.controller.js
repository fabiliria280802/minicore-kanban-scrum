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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = exports.loginUser = exports.getUser = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getUser = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM user WHERE iduser = ?', id, function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getUser = getUser;
var loginUser = function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    connection_1.default.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, data) {
        if (error) {
            res.status(500).json({ msg: "Error al consultar la base de datos" });
            return;
        }
        if (data.length === 0) {
            res.status(404).json({ msg: "Usuario no encontrado o contraseña incorrecta" });
        }
        else {
            var user = data[0];
            if (user.role === 'Administrador') {
                res.json(__assign(__assign({}, user), { isAdmin: true }));
            }
            else {
                res.json(__assign(__assign({}, user), { isAdmin: false }));
            }
        }
    });
};
exports.loginUser = loginUser;
var getUsers = function (req, res) {
    connection_1.default.query('SELECT * FROM user', function (error, data) {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getUsers = getUsers;
var postUser = function (req, res) {
    var body = req.body;
    var query = 'INSERT INTO user SET ?';
    connection_1.default.query(query, body, function (error, data) {
        if (error) {
            res.status(500).json({
                error: "Error al insertar usuario"
            });
        }
        else {
            res.json({
                msg: "Persona agregada con éxito"
            });
        }
    });
};
exports.postUser = postUser;
var putUser = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var query = 'UPDATE user SET ? WHERE iduser =?';
    connection_1.default.query(query, [body, id], function (error, data) {
        if (error)
            throw error;
        if (data.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        }
        else {
            res.json({
                msg: "User updated"
            });
        }
    });
};
exports.putUser = putUser;
var deleteUser = function (req, res) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM user WHERE iduser = ?', id, function (error, result) {
        if (error)
            throw error;
        if (result.length === 0) {
            res.status(404).json({
                msg: "User not found",
                id: id
            });
        }
        else {
            connection_1.default.query('DELETE FROM user WHERE iduser = ?', id, function (deleteError, data) {
                if (deleteError)
                    throw deleteError;
                res.json({
                    msg: "User deleted"
                });
            });
        }
    });
};
exports.deleteUser = deleteUser;
var validateUser = function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    var query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    connection_1.default.query(query, [username, password], function (error, data) {
        if (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
        else if (data.length === 0) {
            res.status(404).json({ msg: "Usuario o contraseña incorrectos" });
        }
        else {
            res.json({ msg: "Login exitoso", user: data[0] });
        }
    });
};
exports.validateUser = validateUser;
