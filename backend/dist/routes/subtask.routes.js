"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var subtask_controller_1 = require("../controllers/subtask.controller");
var router = (0, express_1.Router)();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", subtask_controller_1.getSubtask);
router.get("/", subtask_controller_1.getSubtasks);
router.post("/", subtask_controller_1.postSubtask);
router.put("/:id", subtask_controller_1.putSubtask);
router.delete("/:id", subtask_controller_1.deleteSubtask);
/*
router.get("/:id", validateToken, getSubtask);
router.get("/", validateToken, getSubtasks);
router.post("/", validateToken, postSubtask);
router.put("/:id", validateToken, putSubtask);
router.delete("/:id", validateToken, deleteSubtask);*/
exports.default = router;
