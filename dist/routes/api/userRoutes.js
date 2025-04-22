"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userController_js_1 = require("../../../src/controllers/userController.js");
// api/users
router.route('/').get(userController_js_1.getUsers).post(userController_js_1.createUser);
// api/users/:userId
router.route('/:userId').get(userController_js_1.getUserById).put(userController_js_1.updateUser).delete(userController_js_1.removeUser);
// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(userController_js_1.addFriend).delete(userController_js_1.removeFriend);
exports.default = router;
