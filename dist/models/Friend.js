"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const friendSchema = new mongoose_1.Schema({
    friendId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
    },
});
exports.default = friendSchema;
