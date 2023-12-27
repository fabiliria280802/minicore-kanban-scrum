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

router.get("/:id", validateToken, getSprint);
router.get("/", validateToken, getSprints);
router.post("/", validateToken, postSprint);
router.put("/:id", validateToken, putSprint);
router.delete("/:id", validateToken, validateToken, deleteSprint);

export default router;
