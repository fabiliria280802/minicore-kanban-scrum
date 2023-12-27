"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sprint_controller_1 = require("../controllers/sprint.controller");
var validate_token_1 = __importDefault(require("./validate-token"));
var router = (0, express_1.Router)();
router.get("/:id", validate_token_1.default, sprint_controller_1.getSprint);
router.get("/", validate_token_1.default, sprint_controller_1.getSprints);
router.post("/", validate_token_1.default, sprint_controller_1.postSprint);
router.put("/:id", validate_token_1.default, sprint_controller_1.putSprint);
router.delete("/:id", validate_token_1.default, validate_token_1.default, sprint_controller_1.deleteSprint);
exports.default = router;
