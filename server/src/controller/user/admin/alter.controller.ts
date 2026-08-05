import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import { z } from "zod";
import user from "@/models/userModel.js";
import bcrypt from "bcryptjs";

const alterUserSchema = z.object({
    email: z.coerce
        .string({ error: "Digite um email válido" })
        .toLowerCase()
        .trim(),
    newEmail: z.coerce
        .string({ error: "Digite um email válido" })
        .toLowerCase()
        .trim()
        .optional(),
    newPassword: z.coerce
        .string()
        .min(6, { error: "A senha precisa ter no mínimo 6 caracteres" })
        .max(16, { error: "A senha tem que ter no máximo 16 caracteres" })
        .trim()
        .optional(),
});

type typeAlterUser = z.infer<typeof alterUserSchema>;

export const alterUser = async (req: Request, res: Response): Promise<void> => {
    const validationData = alterUserSchema.safeParse(req.body);
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
    const data: typeAlterUser = validationData.data;
    try {
        const isAdmin = await user
            .findOne({
                email: data.email,
                role: "admin",
                blocked: false,
            })
            .lean();
        if (!isAdmin) {
            res.status(561).json({ error: "Usuário não encontrado" });
            return;
        }
        if (data.newEmail && data.newEmail !== isAdmin.email) {
            const emailExists = await user.findOne({ email: data.newEmail });
            if (emailExists) {
                res.status(409).json({ error: "Esse email já está em uso" });
                return;
            }
        }

        const updateQuery: Partial<{
            email: string;
            password: string;
        }> = {};

        if (isAdmin.email !== data.newEmail) {
            data.newEmail = updateQuery.email;
        }

        if (data.newPassword) {
            updateQuery.password = await bcrypt.hash(data.newPassword, 10);
        }

        if (Object.keys(updateQuery).length === 0) {
            res.status(400).json({
                success: false,
                error: {
                    type: "",
                    message: "",
                },
            });
            return;
        }

        await user.findByIdAndUpdate(
            isAdmin._id,
            {
                $set: updateQuery,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "O email foi alterado com sucesso!",
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default alterUser;
