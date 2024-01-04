import { Router } from "express";
import {
  getTask,
  postTask,
  putTask,
  deleteTask,
  getTasks,
  getTasksBySprintId,
} from "../controllers/task.controller";
import validateToken from "./validate-token";

const router = Router();
//!      momentos desesperados, requieren medidas desesperadas
router.get("/:id", getTask);
router.get("/", getTasks);
router.post("/", postTask);
router.put("/:id", putTask);
router.delete("/:id", deleteTask);
router.get("/sprint/:id", getTasksBySprintId);
/*
router.get("/:id", validateToken, getTask);
router.get("/", validateToken, getTasks);
router.post("/", validateToken, postTask);
router.put("/:id", validateToken, putTask);
router.delete("/:id", validateToken, deleteTask);
*/
export default router;
