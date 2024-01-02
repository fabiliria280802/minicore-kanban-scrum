import { Router } from "express";
import {
  getTask,
  postTask,
  putTask,
  deleteTask,
  getTasks,
} from "../controllers/task.controller";
import validateToken from "./validate-token";

const router = Router();
// TODO: momentos desesperados, requieren medidas desesperadas
router.get("/:id", validateToken, getTask);
router.get("/", validateToken, getTasks);
router.post("/", validateToken, postTask);
router.put("/:id", validateToken, putTask);
router.delete("/:id", validateToken, deleteTask);
/*
router.get("/:id", validateToken, getTask);
router.get("/", validateToken, getTasks);
router.post("/", validateToken, postTask);
router.put("/:id", validateToken, putTask);
router.delete("/:id", validateToken, deleteTask);
*/
export default router;
