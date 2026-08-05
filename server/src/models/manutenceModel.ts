import mongoose, { Schema, model, Document } from "mongoose";

import { enumManutence, enumManutenceBrand } from "@/utils/enumList.js";

export interface IManutenceModelItem {
    model: string;
    price: number;
}

export interface IManutence extends Document {
    adminId: mongoose.Types.ObjectId;
    manutence: string;
    brand: string;
    models: IManutenceModelItem[];
    createdAt: Date;
    updatedAt: Date;
}

const manutenceSchema = new Schema<IManutence>(
    {
        adminId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        manutence: {
            type: String,
            enum: enumManutence,
            required: true,
        },
        brand: {
            type: String,
            required: true,
            enum: enumManutenceBrand,
        },
        models: {
            type: [
                {
                    model: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ],
            required: true,
        },
    },
    { timestamps: true }
);

const manutence = model<IManutence>("manutences", manutenceSchema);

export default manutence;
