import { type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import link from "@/models/linkModel.js";

const listLinks = async (_: any, res: Response): Promise<void> => {
    try {
        const links = await link.find().select("name link").lean();
        if (links.length < 1) {
            res.status(404).json({
                success: false,
                error: {
                    type: "Não achamos nenhum link",
                    message: "Não achamos nenhum link",
                },
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Lista de links",
            list: links,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default listLinks;
