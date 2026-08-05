import { type Response } from "express";

const handlerError = async (res: Response, error: unknown): Promise<void> => {
    res.status(500).json({
        success: false,
        error: {
            type: "internal_server_error",
            message: "Ocorreu um erro interno no servidor.",
            details: error instanceof Error ? error.message : String(error),
        },
    });
};

export default handlerError;
