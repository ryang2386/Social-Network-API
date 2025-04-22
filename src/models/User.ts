import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[]; // Array of ObjectId references to Thought documents
    friends: ObjectId[]; // Array of ObjectId references to User documents
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
           {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
           },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function (this: IUser) {
    return Array.isArray(this.friends) ? this.friends.length : 0;
}
);

const User = model('User', userSchema);

export default User;