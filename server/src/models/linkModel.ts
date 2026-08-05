import { Schema, model, Document } from "mongoose";

export interface ILink extends Document {
    name: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
}

const linkSchema = new Schema<ILink>(
    {
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

const link = model<ILink>("links", linkSchema);

export default link;
