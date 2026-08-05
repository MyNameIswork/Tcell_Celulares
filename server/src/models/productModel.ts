import mongoose, { Schema, model, Types } from "mongoose";
import { enumCategorie, enumModeProduct } from "../utils/enumList.js";

export interface IProduct {
    adminId: Types.ObjectId | string;
    product: string;
    photos: string[];
    description?: string;
    mode: string;
    categorie: string[];
    price: number;
    stock?: number;
    blocked?: boolean;
}

const productSchema = new Schema<IProduct>(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        product: {
            type: String,
            required: true,
            unique: true,
        },
        photos: [
            {
                type: [String],
                validate: [
                    (val: string[]) => val.length <= 3,
                    "Limite de 3 fotos excedido",
                ],
                default: [],
            },
        ],
        description: {
            type: String,
            maxLength: 350,
        },
        mode: {
            type: String,
            enum: enumModeProduct,
            required: true,
        },
        categorie: {
            type: [String],
            enum: enumCategorie,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 1,
        },
        blocked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const product = model<IProduct>("products", productSchema);

export default product;
