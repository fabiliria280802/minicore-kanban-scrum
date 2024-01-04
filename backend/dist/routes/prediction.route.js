"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prediction_controller_1 = require("../controllers/prediction.controller");
var router = (0, express_1.Router)();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", prediction_controller_1.getPrediction);
router.get("/", prediction_controller_1.getPredictions);
router.post("/", prediction_controller_1.postPrediction);
/*
router.get("/:id", validateToken, getSprint);
router.get("/", validateToken, getSprints);
router.post("/", validateToken, postSprint);
router.put("/:id", validateToken, putSprint);
router.delete("/:id", validateToken, deleteSprint);
*/
exports.default = router;
