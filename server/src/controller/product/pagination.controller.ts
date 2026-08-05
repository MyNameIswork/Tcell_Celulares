import { type Request, type Response } from "express";
import product from "@/models/productModel.js";
import handlerError from "@/middleware/handleError.js";

const paginationProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { page: pageParam = "1" } = req.params; // Pega como string, padrão "1"
    const page = parseInt(String(pageParam)) || 1; // Converte para número, padrão 1

    // Validação para página negativa
    if (page < 1) {
        res.status(400).json({
            error: "A página deve ser um número positivo",
        });
        return;
    }

    try {
        const countProducts = await product.countDocuments({
            blocked: { $ne: true },
        });
        if (countProducts < 1) {
            res.status(404).json({
                error: "Não tem nenhum produto disponível no momento",
            });
            return;
        }

        const limit = 500;
        const skip = (page - 1) * limit; // Calcula quantos produtos pular

        const products = await product
            .find({ blocked: { $ne: true } })
            .select("_id product photos mode categorie price stock")
            .skip(skip) // Pula os produtos das páginas anteriores
            .limit(limit); // Limita a 15 produtos por página

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                error: {
                    type: "Não há mais produtos desbloqueados para exibir nesta página",
                    message:
                        "Não há mais produtos desbloqueados para exibir nesta página",
                },
            });
            return;
        }

        const totalPages = Math.ceil(countProducts / limit); // Calcula o total de páginas

        res.status(200).json({
            messsage: `Produtos da página ${page}`,
            list: products,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalProducts: countProducts,
                productsPerPage: limit,
            },
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default paginationProducts;
