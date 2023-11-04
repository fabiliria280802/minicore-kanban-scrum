"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1.Router)();
router.get('/:id', user_controller_1.getUser);
router.get('/', user_controller_1.getUsers);
router.post('/', user_controller_1.postUser);
router.put('/:id', user_controller_1.putUser);
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
