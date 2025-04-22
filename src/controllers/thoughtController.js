"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.createReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getThoughts = void 0;
const index_js_1 = require("../models/index.js");
// get all thoughts
const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield index_js_1.Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
});
exports.getThoughts = getThoughts;
// get a single thought by id
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving thought', error });
        return;
    }
});
exports.getThoughtById = getThoughtById;
// post method to create a new thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield index_js_1.Thought.create(req.body);
        // want to add the thought to the user's thoughts array
        const user = yield index_js_1.User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: newThought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json('Thought created successfully!');
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating thought', error });
        return;
    }
});
exports.createThought = createThought;
// put method to update a thought by id
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield index_js_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating thought', error });
        return;
    }
});
exports.updateThought = updateThought;
// delete method to delete a thought by id
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield index_js_1.Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // want to remove the thought from the user's thoughts array
        const user = yield index_js_1.User.findOneAndUpdate({ username: deletedThought.username }, { $pull: { thoughts: deletedThought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Thought deleted successfully!' });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting thought', error });
        return;
    }
});
exports.deleteThought = deleteThought;
// post method to create a reaction to a thought
const createReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json('Reaction added to thought successfully!');
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating reaction', error });
        return;
    }
});
exports.createReaction = createReaction;
// remove a reaction from a thought by id
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing reaction', error });
        return;
    }
});
exports.removeReaction = removeReaction;
