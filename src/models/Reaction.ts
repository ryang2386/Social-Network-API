import { Schema, Types, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId; // Unique identifier for the reaction
    reactionBody: string;
    username: string; 
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            },
    },
)

export default reactionSchema;
