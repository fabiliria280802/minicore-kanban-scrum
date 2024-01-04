"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var task_controller_1 = require("../controllers/task.controller");
var router = (0, express_1.Router)();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", task_controller_1.getTask);
router.get("/", task_controller_1.getTasks);
router.post("/", task_controller_1.postTask);
router.put("/:id", task_controller_1.putTask);
router.delete("/:id", task_controller_1.deleteTask);
router.get("/sprint/:id", task_controller_1.getTasksBySprintId);
/*
router.get("/:id", validateToken, getTask);
router.get("/", validateToken, getTasks);
router.post("/", validateToken, postTask);
router.put("/:id", validateToken, putTask);
router.delete("/:id", validateToken, deleteTask);
*/
exports.default = router;
