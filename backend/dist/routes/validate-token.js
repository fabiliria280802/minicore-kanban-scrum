"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateToken = function (req, res, next) {
    var _a;
    var headerToken = req.headers["authorization"];
    if (headerToken && headerToken.startsWith("Bearer ")) {
        var bearerToken = headerToken.slice(7);
        jsonwebtoken_1.default.verify(bearerToken, (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : "^H:E{Ll", function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    msg: "Acceso denegado, token inválidox",
                });
            }
            next();
        });
    }
    else {
        res.status(401).json({
            msg: "Acceso denegado, token no proporcionado",
        });
    }
};
exports.default = validateToken;
