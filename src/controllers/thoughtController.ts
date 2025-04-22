import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
}

// get a single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thought', error });
        return;
    }
}

// post method to create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        // want to add the thought to the user's thoughts array
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json('Thought created successfully!');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating thought', error });
        return;
    }
}

// put method to update a thought by id
export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            { $set: req.body},
            { runValidators: true, new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating thought', error });
        return;
    }
}

// delete method to delete a thought by id
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
        );
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // want to remove the thought from the user's thoughts array
        const user = await User.findOneAndUpdate(
            { username: deletedThought.username },
            { $pull: { thoughts: deletedThought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Thought deleted successfully!' });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting thought', error });
        return;
    }
}

// post method to create a reaction to a thought
export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json('Reaction added to thought successfully!');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating reaction', error });
        return;
    }
}

// remove a reaction from a thought by id
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing reaction', error });
        return;
    }
}