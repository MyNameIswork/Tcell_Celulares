import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import manutence from "@/models/manutenceModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const deleteManutenceSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
    manutenceId: z.coerce
        .string()
        .refine((val) => Types.ObjectId.isValid(val), {
            error: "Não foi possível localizar o id da manutenção",
        }),
});

type typeDeleteManutence = z.infer<typeof deleteManutenceSchema>;

const deleteManutence = async (req: Request, res: Response): Promise<void> => {
    const validationData = deleteManutenceSchema.safeParse(req.body);
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
    const data: typeDeleteManutence = validationData.data;
    try {
        const isAdmin = await user
            .findById({
                _id: data.adminId,
                role: "admin",
                blocked: false,
            })
            .lean();

        if (!isAdmin) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível prosseguir",
                    message: "Não foi possível prosseguir",
                },
            });
            return;
        }

        const searchManutence = await manutence.findById({
            _id: data.manutenceId,
        });

        if (!searchManutence) {
            res.status(400).json({
                success: false,
                error: {
                    type: "Não foi possível localizar essa manutenção",
                    message: "Não foi possível localizar essa manutenção",
                },
            });
            return;
        }

        await manutence
            .findByIdAndDelete(data.manutenceId)
            .then(async () => {
                await user.findByIdAndUpdate(
                    data.adminId,
                    { $pull: { manutenceId: data.manutenceId } },
                    { new: true }
                );
                res.status(200).json({
                    success: true,
                    message: "Manutenção deletada com sucesso!",
                });
            })
            .catch((error: unknown) => {
                handlerError(res, error);
            });
    } catch (error) {
        handlerError(res, error);
    }
};

export default deleteManutence;
