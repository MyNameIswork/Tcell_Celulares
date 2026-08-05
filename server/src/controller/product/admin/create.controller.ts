import { type Request, type Response } from "express";
import product, { IProduct } from "@/models/productModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";
import handlerError from "@/middleware/handleError.js";
import cloudinary from "@/config/cloudinary.js";

// Função para upload de imagens usando stream
const streamUpload = (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        uploadStream.end(buffer);
    });
};

const createProductSchema = z.array(
    z.object({
        adminId: z.coerce
            .string()
            .refine((val) => Types.ObjectId.isValid(val), {
                message: "Id inválido",
            }),
        product: z.coerce.string(),
        description: z.coerce
            .string()
            .max(350, { message: "A descrição está grande demais" })
            .optional(),
        mode: z.coerce.string(),
        categorie: z.coerce
            .string()
            .array()
            .min(1, { message: "Informe pelo menos 1 categoria" })
            .max(3, { message: "O limite é 3 categorias por produto" }),
        price: z.coerce.number(),
        stock: z.coerce.number().default(1).optional(),
    })
);

type typeCreateProduct = z.infer<typeof createProductSchema>;

const createProduct = async (req: Request, res: Response): Promise<void> => {
    const validationData = createProductSchema.safeParse(req.body);

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

    const bodyData: typeCreateProduct = validationData.data;
    const files = req.files as Express.Multer.File[] | undefined;

    try {
        const isAdmin = await user
            .findOne({
                _id: bodyData[0].adminId,
                role: "admin",
                blocked: false,
            })
            .lean();

        if (!isAdmin) {
            res.status(403).json({
                success: false,
                error: {
                    type: "Não foi possível prosseguir",
                    message: "Não foi possível prosseguir",
                },
            });
            return;
        }

        for (const data of bodyData) {
            const nameDuplicate = await product.findOne({
                product: data.product,
            });

            if (nameDuplicate) {
                console.warn(`Produto "${data.product}" já existe. Pulando.`);
                continue;
            }

            let photoUrls: string[] = [];

            if (files && files.length > 0) {
                const uploadedImages = await Promise.all(
                    files.map(async (file) => {
                        try {
                            return await streamUpload(file.buffer, "products");
                        } catch (error) {
                            console.error("Erro no upload:", error);
                            return null;
                        }
                    })
                );
                photoUrls = uploadedImages.filter(
                    (url): url is string => url !== null
                );
            } else {
                photoUrls = [
                    "https://res.cloudinary.com/dl2ss9ya0/image/upload/v1741048415/products/pzwert9hiwwgf744anna.webp",
                ];
            }

            // Em vez de ...data, faça:
            const newProduct = await product.create({
                adminId: data.adminId,
                product: data.product,
                description: data.description,
                mode: data.mode,
                categorie: data.categorie,
                price: data.price,
                stock: data.stock || 1,
                photos: photoUrls, // Passa o array montado anteriormente
            } as IProduct); // Força a tipagem do objeto de inserção para o Schema

            await user.findByIdAndUpdate(
                data.adminId,
                {
                    $addToSet: { productId: newProduct._id },
                },
                { new: true }
            );
        }

        res.status(201).json({
            success: true,
            message: "Processamento concluído!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default createProduct;
