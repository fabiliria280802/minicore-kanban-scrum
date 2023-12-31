import { Router } from "express";
import {
  getSubtask,
  postSubtask,
  putSubtask,
  deleteSubtask,
  getSubtasks,
} from "../controllers/subtask.controller";
import validateToken from "./validate-token";

const router = Router();
//!      momentos desesperados, requieren medidas desesperadas

router.get("/:id", getSubtask);
router.get("/", getSubtasks);
router.post("/", postSubtask);
router.put("/:id", putSubtask);
router.delete("/:id", deleteSubtask);
/*
router.get("/:id", validateToken, getSubtask);
router.get("/", validateToken, getSubtasks);
router.post("/", validateToken, postSubtask);
router.put("/:id", validateToken, putSubtask);
router.delete("/:id", validateToken, deleteSubtask);*/

export default router;
