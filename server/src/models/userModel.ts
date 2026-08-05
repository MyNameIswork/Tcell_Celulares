import mongoose, { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    productId: mongoose.Types.ObjectId[];
    manutenceId: mongoose.Types.ObjectId[];
    fileId: mongoose.Types.ObjectId[];
    linkId: mongoose.Types.ObjectId[];
    username: string;
    email: string;
    password: string;
    role: string;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        productId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
        ],
        manutenceId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "manutences",
            },
        ],
        fileId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "files",
            },
        ],
        linkId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "links",
            },
        ],
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "admin",
        },
        blocked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const user = model<IUser>("users", userSchema);

export default user;
