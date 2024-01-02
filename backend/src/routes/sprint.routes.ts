import { Router } from "express";
import {
  getSprint,
  postSprint,
  putSprint,
  deleteSprint,
  getSprints,
} from "../controllers/sprint.controller";
import validateToken from "./validate-token";

const router = Router();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", getSprint);
router.get("/", getSprints);
router.post("/", postSprint);
router.put("/:id", putSprint);
router.delete("/:id", deleteSprint);
/*
router.get("/:id", validateToken, getSprint);
router.get("/", validateToken, getSprints);
router.post("/", validateToken, postSprint);
router.put("/:id", validateToken, putSprint);
router.delete("/:id", validateToken, deleteSprint);
*/
export default router;
