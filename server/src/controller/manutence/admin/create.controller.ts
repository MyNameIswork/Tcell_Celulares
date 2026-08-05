import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import manutence from "@/models/manutenceModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import { z } from "zod";

const PRICE_MARKUP = 100;

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

        let createdGroups = 0;
        let createdModels = 0;
        let updatedModels = 0;
        let unchangedModels = 0;

        for (const group of data) {
            // aplica o markup de R$100 em cada modelo recebido
            const incomingModels = group.models.map((m) => ({
                model: m.model,
                price: m.price + PRICE_MARKUP,
            }));

            const existingGroup = await manutence.findOne({
                manutence: group.manutence,
                brand: group.brand,
            });

            if (!existingGroup) {
                // não existe ainda essa combinação manutence+brand: cria tudo
                const newManutence = await manutence.create({
                    adminId: group.adminId,
                    manutence: group.manutence,
                    brand: group.brand,
                    models: incomingModels,
                });

                await user.findByIdAndUpdate(
                    group.adminId,
                    { $addToSet: { manutenceId: newManutence._id } },
                    { new: true }
                );

                createdGroups++;
                createdModels += incomingModels.length;
                continue;
            }

            // já existe o grupo: percorre modelo por modelo
            for (const incoming of incomingModels) {
                const idx = existingGroup.models.findIndex(
                    (m) => m.model === incoming.model
                );

                if (idx === -1) {
                    // modelo novo dentro de um grupo já existente
                    existingGroup.models.push(incoming);
                    createdModels++;
                } else if (existingGroup.models[idx].price !== incoming.price) {
                    // já existe, mas com preço diferente: atualiza
                    existingGroup.models[idx].price = incoming.price;
                    updatedModels++;
                } else {
                    unchangedModels++;
                }
            }

            await existingGroup.save();
        }

        res.status(201).json({
            success: true,
            message: `Grupos criados: ${createdGroups} | Modelos criados: ${createdModels} | Modelos atualizados: ${updatedModels} | Sem alteração: ${unchangedModels}`,
        });
    } catch (error) {
        handlerError(res, error);
    }
};

export default createManutence;
