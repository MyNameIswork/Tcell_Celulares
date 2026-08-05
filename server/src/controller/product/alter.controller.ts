import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import product from "@/models/productModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const alterNameSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    productId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do produto",
    }),
    newProduct: z.coerce.string(),
});

type typeAlterNameProduct = z.infer<typeof alterNameSchema>;

export const alterNameProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const validationData = alterNameSchema.safeParse(req.body);
    if (!validationData.success) {
        res.status(400).json({
            success: false,
            error: {
                type: "Dados inválidos",
                message: "Dados inválidos",
                details: validationData.error.issues,
            },
        });
        return;
    }

    const data: typeAlterNameProduct = validationData.data;
    try {
        const isAdmin = await user
            .findOne({
                _id: data.adminId,
                role: "admin",
                blocked: false,
            })
            .lean();
        if (!isAdmin) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível prosseguir",
                    message: "Não foi possível prosseguir",
                },
            });
            return;
        }

        const productExist = await product
            .findById(data.productId)
            .select("_id product")
            .lean();
        if (!productExist) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível localizar o produto",
                    message: "Não foi possível localizar o produto",
                },
            });
            return;
        }

        const nameDuplicate = await product
            .findOne({ product: data.newProduct })
            .select("_id product")
            .lean();

        if (nameDuplicate) {
            res.status(403).json({
                success: false,
                error: {
                    type: "Já tem um produto com esse nome",
                    message: "Já tem um produto com esse nome",
                },
            });
            return;
        }

        await product.findByIdAndUpdate(
            data.productId,
            {
                $set: { product: data.newProduct },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "O nome do produto foi alterado",
        });
    } catch (error) {
        handlerError(res, error);
    }
};
