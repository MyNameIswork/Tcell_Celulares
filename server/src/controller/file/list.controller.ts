import { type Request, type Response } from "express";
import handlerError from "@/middleware/handleError.js";
import file from "@/models/fileModel.js";

const listAllFiles = async (req: Request, res: Response): Promise<void> => {
    const { device } = req.query;

    if (!device) {
        res.status(400).json({ error: "Dispositivo não informado" });
        return;
    }

    // Garante que o valor passado ao Mongoose seja uma string simples
    const deviceString = Array.isArray(device) ? device[0] : String(device);

    try {
        const files = await file.find({ device: deviceString });

        if (files.length < 1) {
            res.status(404).json({
                error: "Não foi possível encontrar arquivos para este dispositivo",
            });
            return;
        }

        res.status(200).json({ msg: "Lista de programas", list: files });
    } catch (error) {
        handlerError(res, error);
    }
};

export default listAllFiles;
