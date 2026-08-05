import { type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import product from "@/models/productModel.js";

const listProducts = async (_: any, res: Response): Promise<void> => {
    try {
        const countProducts = await product.countDocuments({ blocked: false });
        if (countProducts < 1) {
            res.status(404).json({
                success: false,
                error: {
                    type: "Não tem nenhum produto no momento",
                    message: "Não tem nenhum produto no momento",
                },
            });
            return;
        }

        const products = await product
            .find({ blocked: { $ne: true } })
            .select("_id product photos mode categorie price stock blocked")
            .lean();
        if (!products) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não encontrei nenhum produto desbloqueado pra mostrar",
                    message:
                        "Não encontrei nenhum produto desbloqueado pra mostrar",
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Aqui está todos os produtos",
            list: products,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default listProducts;
