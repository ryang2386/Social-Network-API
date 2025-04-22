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
exports.removeFriend = exports.addFriend = exports.removeUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const index_js_1 = require("../models/index.js");
// get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield index_js_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});
exports.getUsers = getUsers;
// get a single user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findById(req.params.userId).populate('thoughts', 'thoughtText createdAt reactions').populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user', error });
        return;
    }
});
exports.getUserById = getUserById;
// post method to create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield index_js_1.User.create(req.body);
        res.json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
// put method to update a user by id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield index_js_1.User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating user', error });
        return;
    }
});
exports.updateUser = updateUser;
// remove a user by id and remove their thoughts and friends
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield index_js_1.User.findOneAndDelete({ _id: req.params.userId });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // remove the user's thoughts and friends
        yield index_js_1.Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
        yield index_js_1.User.updateMany({ _id: { $in: deletedUser.friends } }, { $pull: { friends: req.params.userId } });
        res.json({ message: 'User and their thoughts and friends removed successfully!' });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing user', error });
        return;
    }
});
exports.removeUser = removeUser;
// add a friend to a user's friends list
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true }).populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding friend', error });
        return;
    }
});
exports.addFriend = addFriend;
// remove a friend from a user's friends list by id
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true }).populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        console.log("Friend removed successfully!");
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing friend', error });
        return;
    }
});
exports.removeFriend = removeFriend;
