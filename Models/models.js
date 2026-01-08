import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const User = model('User', userSchema);

export default User;