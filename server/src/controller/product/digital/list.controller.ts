import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import product from "@/models/productModel.js";

const listDigital = async (req: Request, res: Response): Promise<void> => {
    try {
        const productType = req.params.type;
        if (!productType || productType !== "digital") {
            res.status(404).json({
                success: false,
                error: {
                    type: "Não foi possível receber o tipo de produto correto.",
                    message:
                        "Não foi possível receber o tipo de produto correto.",
                },
            });
            return;
        }

        const searchProduct = await product.find({
            mode: "Digital",
            blocked: false,
        });
        if (!searchProduct) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível localizar todos os produtos digitais",
                    message:
                        "Não foi possível localizar todos os produtos digitais",
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Aqui está os produtos digitais",
            list: searchProduct,
        });
    } catch (error) {
        handlerError(res, error);
    }
};
export default listDigital;
