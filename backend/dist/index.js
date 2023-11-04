"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var server_1 = __importDefault(require("./models/server"));
(0, dotenv_1.configDotenv)();
var server = new server_1.default();
server.listen();
