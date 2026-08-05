import "dotenv/config";
import { type Request, type Response } from "express";
import { z } from "zod";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
const myCode = process.env.MY_CODE as string;

import handlerError from "@/middleware/handleError.js";
import user from "@/models/userModel.js";
import cookieOptions from "@/utils/cookieOptions.js";

const loginSchema = z.object({
    email: z.coerce
        .string({ error: "Digite um email válido" })
        .toLowerCase()
        .trim(),
    password: z.coerce
        .string()
        .min(6, { error: "A senha é curta demais" })
        .max(16, { error: "A senha é grande demais" })
        .trim(),
    code: z.coerce.string(),
});

type typeLoginAdmin = z.infer<typeof loginSchema>;

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const validationData = loginSchema.safeParse(req.body);
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
    const data: typeLoginAdmin = validationData.data;
    try {
        const isAdmin = await user
            .findOne({
                email: data.email,
                role: "admin",
                blocked: false,
            })
            .lean();
        if (!isAdmin) {
            res.status(403).json({ error: "Não foi possível fazer login" });
            return;
        }

        if (data.code !== myCode) {
            res.status(561).json({
                success: false,
                error: {
                    type: "CODE_INCORRECT",
                    message: "Código inválido",
                },
            });
            return;
        }
        const verifyPassword = await bcrypt.compare(
            data.password,
            isAdmin.password
        );
        if (!verifyPassword) {
            res.status(403).json({
                success: false,
                error: {
                    type: "INCORRET_PASSWORD",
                    message: "Não foi possível fazer login",
                },
            });
            return;
        }

        const payload = {
            _id: isAdmin._id,
            username: isAdmin.username,
            email: isAdmin.email,
            role: isAdmin.role,
        };

        const token = jwt.sign(payload, secret, {
            expiresIn: "7d",
        });

        res.status(200)
            .cookie("access_token", `Bearer ${token}`, cookieOptions)
            .json({
                success: true,
                message: "Login feito com sucesso!",
                token,
            });
    } catch (error) {
        handlerError(res, error);
    }
};

export default loginUser;
