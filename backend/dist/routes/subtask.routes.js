"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var subtask_controller_1 = require("../controllers/subtask.controller");
var validate_token_1 = __importDefault(require("./validate-token"));
var router = (0, express_1.Router)();
router.get("/:id", validate_token_1.default, subtask_controller_1.getSubtask);
router.get("/", validate_token_1.default, subtask_controller_1.getSubtasks);
router.post("/", validate_token_1.default, subtask_controller_1.postSubtask);
router.put("/:id", validate_token_1.default, subtask_controller_1.putSubtask);
router.delete("/:id", validate_token_1.default, subtask_controller_1.deleteSubtask);
exports.default = router;
