import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import manutence from "@/models/manutenceModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const createManutenceSchema = z.array(
    z.object({
        adminId: z.coerce
            .string()
            .refine((val) => Types.ObjectId.isValid(val), {
                message: "Id inválido",
            }),
        manutence: z.coerce.string(),
        brand: z.coerce.string(),
        models: z.array(
            z.object({
                model: z.coerce.string(),
                price: z.coerce.number(),
            })
        ),
    })
);

type typeCreateManutence = z.infer<typeof createManutenceSchema>;

const createManutence = async (req: Request, res: Response): Promise<void> => {
    const validationData = createManutenceSchema.safeParse(req.body);
    if (!validationData.success) {
        res.status(400).json({
            success: false,
            error: {
                type: "Dados inválidos",
                message: "Dados inválidos",
                details: validationData.error,
            },
        });
        return;
    }

    const data: typeCreateManutence = validationData.data;

    try {
        const isAdmin = await user.findById(data[0].adminId);
        if (!isAdmin) {
            res.status(561).json({
                success: false,
                error: {
                    type: "Não foi possível prosseguir",
                    message: "Não foi possível prosseguir",
                },
            });
            return;
        }

        const manutencesToCreate = validationData.data;
        let createdCount = 0;

        for (const data of manutencesToCreate) {
            const searchModel = await manutence.findOne({
                manutence: data.manutence,
                brand: data.brand,
                "models.model": { $in: data.models.map((m: any) => m.model) },
            });

            if (searchModel) {
                // Caso o modelo já exista, não cria a manutenção e pula para o próximo
                console.log(
                    `Modelo já cadastrado: ${data.brand} - ${data.manutence}`
                );
                continue;
            }

            const newManutence = await manutence.create({
                adminId: data.adminId,
                manutence: data.manutence,
                brand: data.brand,
                models: data.models,
            });

            await user.findByIdAndUpdate(
                data.adminId,
                {
                    $addToSet: { manutenceId: newManutence },
                },
                { new: true }
            );
            createdCount++;
        }

        res.status(201).json({
            success: true,
            message: `${createdCount} manutenções cadastradas`,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default createManutence;
