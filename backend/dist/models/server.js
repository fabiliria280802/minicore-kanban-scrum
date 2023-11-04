"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_routes_1 = __importDefault(require("../routes/user.routes"));
var connection_1 = __importDefault(require("../db/connection"));
var Server = /** @class */ (function () {
    function Server() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '4000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Servidor corriendo en puerto ' + _this.port);
        });
    };
    Server.prototype.middlewares = function () {
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        this.app.use('/api/users', user_routes_1.default);
    };
    Server.prototype.connectDB = function () {
        connection_1.default.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Base de datos online");
        });
    };
    return Server;
}());
exports.default = Server;
