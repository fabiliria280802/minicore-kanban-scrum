"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var task_controller_1 = require("../controllers/task.controller");
var validate_token_1 = __importDefault(require("./validate-token"));
var router = (0, express_1.Router)();
router.get("/:id", validate_token_1.default, task_controller_1.getTask);
router.get("/", validate_token_1.default, task_controller_1.getTasks);
router.post("/", validate_token_1.default, task_controller_1.postTask);
router.put("/:id", validate_token_1.default, task_controller_1.putTask);
router.delete("/:id", validate_token_1.default, task_controller_1.deleteTask);
exports.default = router;
