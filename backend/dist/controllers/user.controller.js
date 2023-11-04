"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = exports.getUser = void 0;
var getUser = function (req, res) {
    var id = req.params.id;
    res.json({
        msg: "getUser",
        id: id,
    });
};
exports.getUser = getUser;
var getUsers = function (req, res) {
    res.json({
        msg: "getUsers"
    });
};
exports.getUsers = getUsers;
var postUser = function (req, res) {
    var body = req.body;
    res.json({
        msg: "postUser",
        body: body,
    });
};
exports.postUser = postUser;
var putUser = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    res.json({
        msg: "putUser",
        id: id,
        body: body,
    });
};
exports.putUser = putUser;
var deleteUser = function (req, res) {
    var id = req.params.id;
    res.json({
        msg: "deleteUser",
        id: id,
    });
};
exports.deleteUser = deleteUser;
