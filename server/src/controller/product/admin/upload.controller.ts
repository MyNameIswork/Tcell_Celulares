import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import product from "@/models/productModel.js";
import user from "@/models/userModel.js";
import { z } from "zod";
import { Types } from "mongoose";
import cloudinary from "@/config/cloudinary.js";

const uploadImgProductSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    productId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do produto",
    }),
});

type typeUploadImgProduct = z.infer<typeof uploadImgProductSchema>;

const uploadImgProduct = async (req: Request, res: Response): Promise<void> => {
    const validationData = uploadImgProductSchema.safeParse(req.body);
    if (!validationData.success) {
        res.status(400).json({
            succes: false,
            error: {
                type: "",
                message: "",
                details: validationData.error.issues,
            },
        });
        return;
    }

    const data: typeUploadImgProduct = validationData.data;

    try {
        // Verifica se o admin existe e tem permissão
        const isAdmin = await user
            .findOne({
                _id: data.adminId,
                role: "admin",
                blocked: false,
            })
            .lean();
        if (!isAdmin) {
            res.status(561).json({
                success: false,
                error: {
                    type: "Você não tem permissão!",
                    message: "Você não tem permissão!",
                },
            });
            return;
        }

        // Verifica se o produto existe
        const productExist = await product.findById(data.productId);
        if (!productExist) {
            res.status(404).json({
                success: false,
                error: {
                    type: "Produto não encontrado!",
                    message: "Produto não encontrado!",
                },
            });
            return;
        }

        // Verifica se o arquivo foi enviado corretamente
        if (!req.file) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Nenhuma imagem foi enviada!",
                    message: "Nenhuma imagem foi enviada!",
                },
            });
            return;
        }

        // Faz o upload da imagem para o Cloudinary
        const streamUpload = (fileBuffer: any) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "products" },
                    (error: any, result: any) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const result: any = await streamUpload(req.file.buffer);
        const newImage = result.secure_url;

        // Remove todas as fotos antes de adicionar a nova
        await product.findByIdAndUpdate(data.productId, {
            $set: { photos: [] },
        });

        // Adiciona a nova imagem ao array de fotos
        await product.findByIdAndUpdate(
            data.productId,
            { $push: { photos: newImage } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Foto adicionada com sucesso!",
            imageUrl: newImage,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default uploadImgProduct;
