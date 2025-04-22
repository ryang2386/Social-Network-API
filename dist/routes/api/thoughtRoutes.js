"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const thoughtController_js_1 = require("../../../src/controllers/thoughtController.js");
// /api/thoughts
router.route('/').get(thoughtController_js_1.getThoughts).post(thoughtController_js_1.createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(thoughtController_js_1.getThoughtById).put(thoughtController_js_1.updateThought).delete(thoughtController_js_1.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(thoughtController_js_1.createReaction).delete(thoughtController_js_1.removeReaction);
exports.default = router;
