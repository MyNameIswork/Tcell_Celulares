import "dotenv/config";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import user from "@/models/userModel.js";
import handlerError from "@/middleware/handleError.js";
import cookieOptions from "@/utils/cookieOptions.js";
const secret = process.env.JWT_SECRET as string;

const registerUserSchema = z.object({
    username: z.coerce.string().min(3, {
        error: "É necessário que o nome tenha pelo menos 3 caracteres",
    }),
    email: z.coerce
        .string({ error: "Digite um email válido" })
        .toLowerCase()
        .trim(),
    password: z.coerce
        .string()
        .min(6, { error: "A senha é curta demais" })
        .max(16, { error: "A senha é grande demais" })
        .trim(),
});

type typeRegisterUser = z.infer<typeof registerUserSchema>;

const registerNewUser = async (req: Request, res: Response): Promise<void> => {
    const validationData = registerUserSchema.safeParse(req.body);
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
    const data: typeRegisterUser = validationData.data;
    try {
        const limitAdmin = await user.countDocuments();
        if (limitAdmin > 2) {
            res.status(403).json({ error: "Já tem um admin cadastrado" });
            return;
        }

        const emailDuplicate = await user.findOne({ email: data.email }).lean();
        if (emailDuplicate) {
            res.status(403).json({ error: "Esse email já foi cadastrado" });
            return;
        }

        const createPasswordWithHash = await bcrypt.hash(data.password, 10);
        const newUser = await user.create({
            username: data.username,
            email: data.email,
            password: createPasswordWithHash,
        });

        const payload = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        };

        const token = jwt.sign(payload, secret, {
            expiresIn: "7d",
        });

        res.status(201)
            .cookie("access_token", `Bearer ${token}`, cookieOptions)
            .json({
                success: true,
                message: "Conta criada com sucesso!",
                token,
            });
    } catch (error) {
        handlerError(res, error);
    }
};

export default registerNewUser;
