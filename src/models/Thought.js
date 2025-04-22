"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Reaction_1 = __importDefault(require("./Reaction")); // Import the Reaction interface
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        Reaction_1.default
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
