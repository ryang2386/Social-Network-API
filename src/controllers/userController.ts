import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

// get a single user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts', 'thoughtText createdAt reactions').populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json(user);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user', error });
        return;
    }
}

// post method to create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
}

// put method to update a user by id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.userId }, 
            { $set: req.body},
            { runValidators: true, new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating user', error });
        return;
        }
    }

// remove a user by id and remove their thoughts and friends
export const removeUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findOneAndDelete(
            {_id: req.params.userId }
        );

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // remove the user's thoughts and friends
        await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
        await User.updateMany(
            { _id: { $in: deletedUser.friends } },
            { $pull: { friends: req.params.userId } }
        );

        res.json({ message: 'User and their thoughts and friends removed successfully!' });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing user', error });
        return;
    }
}

// add a friend to a user's friends list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).populate('Friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding friend', error });
        return;
    }
}

// remove a friend from a user's friends list by id
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).populate('Friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        console.log("Friend removed successfully!");
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing friend', error });
        return;
    }
}
