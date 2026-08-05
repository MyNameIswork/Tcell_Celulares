import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import file from "@/models/fileModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const deleteFileSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    fileId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do arquivo",
    }),
});

type typeDeleteFile = z.infer<typeof deleteFileSchema>;

const deleteFile = async (req: Request, res: Response): Promise<void> => {
    const validationData = deleteFileSchema.safeParse(req.body);
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
    const data: typeDeleteFile = validationData.data;
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

        const fileExist = await file.findById(data.fileId);
        if (!fileExist) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível localizar esse arquivo",
                    message: "Não foi possível localizar esse arquivo",
                },
            });
            return;
        }
        await user.findByIdAndUpdate(
            data.adminId,
            {
                $pull: { fileId: data.fileId },
            },
            { new: true }
        );
        await file.findByIdAndDelete(data.fileId);
        res.status(200).json({
            success: true,
            message: "Arquivo deletado com sucesso!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default deleteFile;
