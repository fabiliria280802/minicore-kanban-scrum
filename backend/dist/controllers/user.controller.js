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
exports.deleteUser = exports.putUser = exports.signInUser = exports.getUsers = exports.loginUser = exports.getUser = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_1 = __importDefault(require("../models/user"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sequelize_1 = require("sequelize");
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({
                        where: { iduser: id },
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            msg: "User not found",
                        })];
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Database query error:", error_1);
                res.status(500).json({
                    msg: "Error retrieving user",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, login, password, user, passwordValid, token, error_2;
    var _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, login = _a.login, password = _a.password;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({
                        where: (_b = {},
                            _b[sequelize_1.Op.or] = [{ username: login }, { email: login }],
                            _b),
                    })];
            case 2:
                user = _d.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el nombre o correo ".concat(login),
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                passwordValid = _d.sent();
                if (!passwordValid) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Password Incorrecta",
                        })];
                }
                token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    username: user.username,
                }, (_c = process.env.SECRET_KEY) !== null && _c !== void 0 ? _c : "^H:E{Ll");
                res.json({ token: token });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                console.error("Login error: ", error_2);
                res.status(500).json({
                    msg: "Ocurrió un error al intentar iniciar sesión",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, results, metadata, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, connection_1.default.query("SELECT * FROM users")];
            case 1:
                _a = _b.sent(), results = _a[0], metadata = _a[1];
                res.json(results);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error("Database query error:", error_3);
                res.status(500).json({
                    msg: "Error retrieving users",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// Define the isValidPassword function outside of the postUser function
function isValidPassword(password) {
    var hasMinLength = password.length >= 8;
    var hasSpecialChars = /[^A-Za-z0-9]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasNumbers = /\d/.test(password);
    return hasMinLength && hasSpecialChars && hasUpperCase && hasNumbers;
}
var signInUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullname, username, email, password, type, position, userExistsEmail, userExistsUsername, hashedPassword, newUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullname = _a.fullname, username = _a.username, email = _a.email, password = _a.password, type = _a.type, position = _a.position;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_1.default.findOne({ where: { email: email } })];
            case 2:
                userExistsEmail = _b.sent();
                return [4 /*yield*/, user_1.default.findOne({
                        where: { username: username },
                    })];
            case 3:
                userExistsUsername = _b.sent();
                if (userExistsEmail) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Ya existe un usuario con el correo ".concat(email),
                        })];
                }
                if (userExistsUsername) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Ya existe un usuario con el username ".concat(username),
                        })];
                }
                if (!/.*@skam\.com$/.test(email)) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Este correo ".concat(email, " no cumple con los estandares de la organizaci\u00F3n"),
                        })];
                }
                if (!isValidPassword(password)) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "La contraseña no cumple con los requisitos de seguridad",
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 4:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user_1.default.create({
                        fullname: fullname,
                        username: username,
                        email: email,
                        password: hashedPassword,
                        type: type,
                        position: position,
                    })];
            case 5:
                newUser = _b.sent();
                res.json({
                    msg: "Usuario ".concat(fullname, " creado exitosamente"),
                });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                res.status(500).json({
                    msg: "Ocurrió un error al crear el usuario",
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signInUser = signInUser;
var putUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateData, user, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                updateData = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_1.default.findByPk(id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            msg: "User not found",
                            id: id,
                        })];
                }
                if (!(updateData.hasOwnProperty("password") && updateData.password)) return [3 /*break*/, 4];
                _a = updateData;
                return [4 /*yield*/, bcrypt_1.default.hash(updateData.password, 10)];
            case 3:
                _a.password = _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, user.update(updateData)];
            case 5:
                _b.sent();
                res.json({
                    msg: "User updated",
                    user: user,
                });
                return [3 /*break*/, 7];
            case 6:
                error_5 = _b.sent();
                console.error("Database query error:", error_5);
                res.status(500).json({
                    msg: "Error updating user",
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putUser = putUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.destroy({
                        where: { iduser: id },
                    })];
            case 2:
                result = _a.sent();
                if (result === 0) {
                    return [2 /*return*/, res.status(404).json({
                            msg: "User not found",
                            id: id,
                        })];
                }
                res.json({
                    msg: "User deleted successfully",
                });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Database query error:", error_6);
                res.status(500).json({
                    msg: "Error deleting user",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
