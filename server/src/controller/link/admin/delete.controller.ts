import handlerError from "@/middleware/handleError.js";
import link from "@/models/linkModel.js";
import user from "@/models/userModel.js";
import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { z } from "zod";

const deleteLinkSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    linkId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do link",
    }),
});

type typeDeleteLink = z.infer<typeof deleteLinkSchema>;

const deleteLink = async (req: Request, res: Response): Promise<void> => {
    const validationData = deleteLinkSchema.safeParse(req.body);
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
    const data: typeDeleteLink = validationData.data;
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
                    type: "Você não tem permissão",
                    message: "Você não tem permissão",
                },
            });
            return;
        }

        const linkExist = await link.findById(data.linkId);
        if (!linkExist) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível localizar esse link",
                    message: "Não foi possível localizar esse link",
                },
            });
            return;
        }
        await link.findByIdAndDelete(data.linkId);
        res.status(200).json({
            success: true,
            message: "Link deletado com sucesso!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default deleteLink;
