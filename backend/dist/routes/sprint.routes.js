"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprint_controller_1 = require("../controllers/sprint.controller");
const router = (0, express_1.Router)();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", sprint_controller_1.getSprint);
router.get("/", sprint_controller_1.getSprints);
router.post("/", sprint_controller_1.postSprint);
router.put("/:id", sprint_controller_1.putSprint);
router.delete("/:id", sprint_controller_1.deleteSprint);
/*
router.get("/:id", validateToken, getSprint);
router.get("/", validateToken, getSprints);
router.post("/", validateToken, postSprint);
router.put("/:id", validateToken, putSprint);
router.delete("/:id", validateToken, deleteSprint);
*/
exports.default = router;
