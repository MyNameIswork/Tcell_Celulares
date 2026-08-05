import mongoose, { Schema, model, Document } from "mongoose";

export interface IFile extends Document {
    adminId: mongoose.Types.ObjectId;
    device: string;
    name: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
}

const fileSchema = new Schema<IFile>(
    {
        adminId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        device: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        link: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const file = model<IFile>("files", fileSchema);

export default file;
