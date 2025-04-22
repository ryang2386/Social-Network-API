"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = exports.Reaction = exports.Thought = exports.User = void 0;
const User_js_1 = __importDefault(require("../../src/models/User.js"));
exports.User = User_js_1.default;
const Thought_js_1 = __importDefault(require("../../src/models/Thought.js"));
exports.Thought = Thought_js_1.default;
const Reaction_js_1 = __importDefault(require("../../src/models/Reaction.js"));
exports.Reaction = Reaction_js_1.default;
const Friend_js_1 = __importDefault(require("../../src/models/Friend.js"));
exports.Friend = Friend_js_1.default;
