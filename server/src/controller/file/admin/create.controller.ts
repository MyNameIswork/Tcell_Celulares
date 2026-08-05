import { type Request, type Response } from "express";
import { z } from "zod";
import file from "@/models/fileModel.js";
import { Types } from "mongoose";
import user from "@/models/userModel.js";
import handlerError from "@/middleware/handleError.js";

const createFileSchema = z.array(
    z.object({
        adminId: z.coerce
            .string()
            .refine((val) => Types.ObjectId.isValid(val), {
                error: "Id inválido",
            }),
        device: z.coerce.string(),
        name: z.coerce.string(),
        link: z.coerce.string(),
    })
);

type typeCreateFile = z.infer<typeof createFileSchema>;

const createFile = async (req: Request, res: Response): Promise<void> => {
    const validationData = createFileSchema.safeParse(req.body);
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

    const files: typeCreateFile = validationData.data;

    try {
        const isAdmin = await user.findById(files[0].adminId).lean();
        if (!isAdmin) {
            res.status(400).json({ error: "Não foi possível prosseguir" });
            return;
        }
        // Verificando duplicados e criando os arquivos
        for (const data of files) {
            const nameDuplicate = await file
                .findOne({ name: data.name })
                .lean();
            if (nameDuplicate) {
                res.status(403).json({
                    error: `Já tem um link com o nome ${data.name}.`,
                });
                return;
            }
            const linkDuplicate = await file
                .findOne({ link: data.link })
                .lean();
            if (linkDuplicate) {
                res.status(403).json({
                    error: `O arquivo com o link ${data.link} já foi cadastrado.`,
                });
                return;
            }

            const newFile = await file.create({
                adminId: data.adminId,
                device: data.device,
                name: data.name,
                link: data.link,
            });

            await user.findByIdAndUpdate(
                data.adminId,
                {
                    $addToSet: { fileId: newFile._id },
                },
                { new: true }
            );
        }

        res.status(201).json({ msg: "Arquivos criados com sucesso!" });
    } catch (error) {
        handlerError(res, error);
    }
};

export default createFile;
