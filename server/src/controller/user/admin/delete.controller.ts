import handlerError from "@/middleware/handleError.js";
import user from "@/models/userModel.js";
import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { z } from "zod";

const deleteUserSchema = z.object({
    adminId: z.coerce.string().refine((val) => Types.ObjectId.isValid(val), {
        error: "Não foi possível localizar o id do usuário",
    }),
});

type typeDeleteUser = z.infer<typeof deleteUserSchema>;

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const validationData = deleteUserSchema.safeParse(req.body);
    if (!validationData.success) {
        res.status(400).json({
            success: false,
            error: {
                type: "Dados inválidos",
                message: "",
                details: validationData.error.issues,
            },
        });
        return;
    }
    const data: typeDeleteUser = validationData.data;
    try {
        const isAdmin = await user.findById(data.adminId);
        if (!isAdmin) {
            res.status(561).json({
                error: "Não foi possível localizar o admin",
            });
            return;
        }

        await user.findByIdAndDelete(data.adminId);
        res.status(200).json({
            success: true,
            msg: "Conta deletada com sucesso!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default deleteUser;
