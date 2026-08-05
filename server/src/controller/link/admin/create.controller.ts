import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import link from "@/models/linkModel.js";
import user from "@/models/userModel.js";
import { Types } from "mongoose";
import z from "zod";

const createLinkSchema = z.array(
    z.object({
        adminId: z.coerce
            .string()
            .refine((val) => Types.ObjectId.isValid(val), {
                message: "Não foi possível localizar o id do usuário",
            }),
        name: z.coerce.string(),
        link: z.coerce.string(),
    })
);

type typeCreateLink = z.infer<typeof createLinkSchema>;

const createLink = async (req: Request, res: Response): Promise<void> => {
    const validationData = createLinkSchema.safeParse(req.body);
    if (!validationData.success) {
        res.status(400).json({
            error: "Dados inválidos",
            details: validationData.error.issues,
        });
        return;
    }

    const data: typeCreateLink = validationData.data;

    try {
        // Correção: usando 'data' ao invés de 'links'
        const isAdmin = await user.findById(data[0].adminId);
        if (!isAdmin) {
            res.status(400).json({ error: "Não foi possível prosseguir" });
            return;
        }

        const existingLinks = await link.find({
            $or: [
                { name: { $in: data.map((l) => l.name) } },
                { link: { $in: data.map((l) => l.link) } },
            ],
        });

        if (existingLinks.length > 0) {
            const existingNames = existingLinks.map((l) => l.name);
            const existingLinksUrls = existingLinks.map((l) => l.link);
            res.status(403).json({
                success: false,
                error: {
                    type: "",
                    message: `Já existem links com os seguintes nomes: ${existingNames.join(", ")} ou links já cadastrados: ${existingLinksUrls.join(", ")}`,
                },
            });
            return;
        }

        for (const item of data) {
            const newLink = await link.create(item);
            await user.findByIdAndUpdate(
                item.adminId,
                { $addToSet: { linkId: newLink._id } },
                { new: true }
            );
        }

        res.status(201).json({ msg: "Link criado com sucesso!" });
    } catch (error) {
        handlerError(res, error);
    }
};

export default createLink;
