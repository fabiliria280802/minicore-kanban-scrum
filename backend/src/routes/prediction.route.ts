import { Router } from "express";
import {
  getPrediction,
  getPredictions,
} from "../controllers/prediction.controller";
import validateToken from "./validate-token";

const router = Router();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", getPrediction);
router.get("/", getPredictions);

/*
router.get("/:id", validateToken, getSprint);
router.get("/", validateToken, getSprints);
router.post("/", validateToken, postSprint);
router.put("/:id", validateToken, putSprint);
router.delete("/:id", validateToken, deleteSprint);
*/
export default router;