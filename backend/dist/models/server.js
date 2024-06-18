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
//rutas
require('dotenv').config();
var user_routes_1 = __importDefault(require("../routes/user.routes"));
var sprint_routes_1 = __importDefault(require("../routes/sprint.routes"));
var task_routes_1 = __importDefault(require("../routes/task.routes"));
var subtask_routes_1 = __importDefault(require("../routes/subtask.routes"));
//models
//config fk
var index_1 = require("./index");
//conexion db
var connection_1 = __importDefault(require("../db/connection"));
//adicionales
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "4005";
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Servidor corriendo en puerto " + _this.port);
        });
    };
    Server.prototype.middlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'https://minicoreagil-git-main-fabiliria280802s-projects.vercel.app:4040'
        }));
    };
    Server.prototype.routes = function () {
        this.app.use("/api/users", user_routes_1.default);
        this.app.use("/api/sprints", sprint_routes_1.default);
        this.app.use("/api/tasks", task_routes_1.default);
        this.app.use("/api/subtasks", subtask_routes_1.default);
    };
    Server.prototype.connectDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, connection_1.default.authenticate()];
                    case 1:
                        _a.sent();
                        console.log("Conexión a la base de datos exitosa");
                        return [4 /*yield*/, index_1.Sprint.sync()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, index_1.User.sync()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, index_1.Task.sync()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, index_1.Subtask.sync()];
                    case 5:
                        _a.sent();
                        console.log("Base de datos online");
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error("No se pudo conectar a la base de datos:", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
exports.default = Server;
