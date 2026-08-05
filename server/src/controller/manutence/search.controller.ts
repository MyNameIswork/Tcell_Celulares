import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import manutence from "@/models/manutenceModel.js";
import { z } from "zod";

const listModelSchema = z.object({
    brand: z.coerce.string(),
    manutence: z.coerce.string(),
});

type typeListModel = z.infer<typeof listModelSchema>;

const getListModels = async (req: Request, res: Response): Promise<void> => {
    const validationData = listModelSchema.safeParse(req.query);
    if (!validationData.success) {
        res.status(400).json({
            success: false,
            error: {
                type: "",
                message: "",
                details: validationData.error.issues,
            },
        });
        return;
    }
    const data: typeListModel = validationData.data;
    try {
        const searchAllModels = await manutence
            .find({
                brand: data.brand,
                manutence: data.manutence,
            })
            .select("_id models")
            .lean();

        if (searchAllModels.length === 0) {
            res.status(404).json({
                success: false,
                error: {
                    type: "",
                    message: "",
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            messsage: "Aqui está todos os modelos",
            list: searchAllModels,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default getListModels;
