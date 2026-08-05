import { type Request, type Response } from "express";
import cloudinary from "@/config/cloudinary.js";
import handlerError from "@/middleware/handleError.js";
import product from "@/models/productModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const deleteProductSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    productId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do produto",
    }),
});

type typeDeleteProduct = z.infer<typeof deleteProductSchema>;

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const validationData = deleteProductSchema.safeParse(req.body);
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
    const data: typeDeleteProduct = validationData.data;

    try {
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
                    type: "Você não pode prosseguir",
                    message: "Você não pode prosseguir",
                },
            });
            return;
        }

        // Busca o produto no banco de dados
        const searchProduct = await product.findById(data.productId);
        if (!searchProduct) {
            res.status(404).json({
                success: false,
                error: {
                    type: "Não foi possível localizar o produto",
                    message: "Não foi possível localizar o produto",
                },
            });
            return;
        }

        // Extrai os links das imagens do produto
        const imageUrls = searchProduct.photos;

        // Deleta as imagens do Cloudinary
        if (imageUrls && imageUrls.length > 0) {
            await Promise.all(
                imageUrls.map(async (imageUrl) => {
                    try {
                        // Extrai o public_id completo da URL da imagem
                        const urlParts = imageUrl.split("/upload/");
                        if (urlParts.length > 1) {
                            const publicIdWithVersion = urlParts[1]
                                .split("/")
                                .slice(1)
                                .join("/"); // Remove a versão (v1740800489)
                            const publicId = publicIdWithVersion.split(".")[0]; // Remove a extensão do arquivo
                            if (publicId) {
                                await cloudinary.uploader.destroy(publicId);
                                console.log(
                                    `Imagem ${publicId} deletada do Cloudinary.`
                                );
                            }
                        }
                    } catch (error) {
                        handlerError(res, error);
                    }
                })
            );
        }

        // Deleta o produto do banco de dados
        await product.findByIdAndDelete(data.productId);

        res.status(200).json({
            success: true,
            message: "Produto excluído com sucesso!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default deleteProduct;
