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
// rutas
require('dotenv').config();
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const sprint_routes_1 = __importDefault(require("../routes/sprint.routes"));
const task_routes_1 = __importDefault(require("../routes/task.routes"));
const subtask_routes_1 = __importDefault(require("../routes/subtask.routes"));
// models
// config fk
const index_1 = require("./index");
// conexión db
const connection_1 = __importDefault(require("../db/connection"));
// adicionales
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "4002";
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            credentials: true
        }));
    }
    routes() {
        this.app.use("/api/users", user_routes_1.default);
        this.app.use("/api/sprints", sprint_routes_1.default);
        this.app.use("/api/tasks", task_routes_1.default);
        this.app.use("/api/subtasks", subtask_routes_1.default);
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Conexión a la base de datos exitosa");
                yield index_1.User.sync();
                yield index_1.Sprint.sync();
                yield index_1.Task.sync();
                yield index_1.Subtask.sync();
                console.log("Base de datos online");
            }
            catch (error) {
                console.error("No se pudo conectar a la base de datos:", error);
            }
        });
    }
}
exports.default = Server;
