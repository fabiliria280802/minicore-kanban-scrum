"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var task_controller_1 = require("../controllers/task.controller");
var validate_token_1 = __importDefault(require("./validate-token"));
var router = (0, express_1.Router)();
// TODO: momentos desesperados, requieren medidas desesperadas
router.get("/:id", validate_token_1.default, task_controller_1.getTask);
router.get("/", validate_token_1.default, task_controller_1.getTasks);
router.post("/", validate_token_1.default, task_controller_1.postTask);
router.put("/:id", validate_token_1.default, task_controller_1.putTask);
router.delete("/:id", validate_token_1.default, task_controller_1.deleteTask);
/*
router.get("/:id", validateToken, getTask);
router.get("/", validateToken, getTasks);
router.post("/", validateToken, postTask);
router.put("/:id", validateToken, putTask);
router.delete("/:id", validateToken, deleteTask);
*/
exports.default = router;
