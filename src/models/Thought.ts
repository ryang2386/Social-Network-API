import { Schema, model, Document, ObjectId } from 'mongoose';
import Reaction from './Reaction'; // Import the Reaction interface

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: ObjectId[]; // Array of ObjectId references to Reaction documents
}

const thoughtSchema = new Schema<IThought>(
    {
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
        Reaction
    ],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

export default Thought;
