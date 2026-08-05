import { type Request, type Response } from "express";
import { z } from "zod";
import manutence from "@/models/manutenceModel.js";
import handlerError from "@/middleware/handleError.js";

const listManutenceSchema = z.object({
    brand: z.coerce.string({ error: "É necessário digitar a marca." }),
});

type typeListManutence = z.infer<typeof listManutenceSchema>;

const listManutence = async (req: Request, res: Response): Promise<void> => {
    const validationData = listManutenceSchema.safeParse(req.query);
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

    const data: typeListManutence = validationData.data;
    try {
        const searchManutence = await manutence
            .find({ brand: data.brand })
            .select("_id manutence")
            .lean();

        if (searchManutence.length === 0) {
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
            message: "Aqui está a lista",
            list: searchManutence,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default listManutence;
