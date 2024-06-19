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
exports.deleteUser = exports.putUser = exports.signInUser = exports.getUsers = exports.loginUser = exports.getUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findOne({
            where: { iduser: id },
        });
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({
            msg: "Error retrieving user",
        });
    }
});
exports.getUser = getUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { login, password } = req.body;
    try {
        const user = yield user_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ username: login }, { email: login }],
            },
        });
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el nombre o correo ${login}`,
            });
        }
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: "Password Incorrecta",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            iduser: user.iduser,
            username: user.username,
            type: user.type,
        }, (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : "^H:E{Ll", { expiresIn: '1000d' });
        res.json({ token });
    }
    catch (error) {
        console.error(`Login error: `, error);
        res.status(500).json({
            msg: "Ocurrió un error al intentar iniciar sesión",
        });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results, metadata] = yield connection_1.default.query("SELECT * FROM users");
        res.json(results);
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({
            msg: "Error retrieving users",
        });
    }
});
exports.getUsers = getUsers;
// Define the isValidPassword function outside of the postUser function
function isValidPassword(password) {
    const hasMinLength = password.length >= 8;
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasMinLength && hasSpecialChars && hasUpperCase && hasNumbers;
}
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password, type, position } = req.body;
    try {
        const userExistsEmail = yield user_1.default.findOne({ where: { email: email } });
        const userExistsUsername = yield user_1.default.findOne({
            where: { username: username },
        });
        if (userExistsEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el correo ${email}`,
            });
        }
        if (userExistsUsername) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el username ${username}`,
            });
        }
        if (!/.*@skam\.com$/.test(email)) {
            return res.status(400).json({
                msg: `Este correo ${email} no cumple con los estandares de la organización`,
            });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({
                msg: "La contraseña no cumple con los requisitos de seguridad",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            type,
            position,
        });
        res.json({
            msg: `Usuario ${fullname} creado exitosamente`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrió un error al crear el usuario",
        });
    }
});
exports.signInUser = signInUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                id: id,
            });
        }
        if (updateData.hasOwnProperty("password") && updateData.password) {
            updateData.password = yield bcrypt_1.default.hash(updateData.password, 10);
        }
        yield user.update(updateData);
        res.json({
            msg: "User updated",
            user: user,
        });
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({
            msg: "Error updating user",
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield user_1.default.destroy({
            where: { iduser: id },
        });
        if (result === 0) {
            return res.status(404).json({
                msg: "User not found",
                id: id,
            });
        }
        res.json({
            msg: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({
            msg: "Error deleting user",
        });
    }
});
exports.deleteUser = deleteUser;
