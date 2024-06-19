"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/:id", user_controller_1.getUser);
router.get("/", user_controller_1.getUsers);
router.post("/signIn", user_controller_1.signInUser);
router.put("/:id", user_controller_1.putUser);
router.delete("/:id", user_controller_1.deleteUser);
router.post("/login", user_controller_1.loginUser);
exports.default = router;
