import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
const app = express();
import { createServer } from "node:http";
const serverHTTP = createServer(app);

import bodyParser from "body-parser";
import helmet from "helmet";

import conn from "@/database/conn.js";
import router from "@/routes/v1/index.js";
import corsConfig from "@/config/corsConfig.js";

if (process.env.NODE_ENV == "production") {
    app.set("trust proxy", 1);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsConfig);
app.use(helmet());
app.disable("x-powered-by");

app.use("/", (req: Request, _, next: NextFunction) => {
    console.log(`Method: ${req.method} | Path: ${req.path}`);
    next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Erro não tratado:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
});

app.use("/api/v1", router);

const port = Number(process.env.PORT) || 3000;

serverHTTP.listen(port, async () => {
    try {
        console.log(`Servidor rodando na porta ${port}`);
        await conn();
    } catch (error) {
        console.error(`Não foi possível iniciar o servidor. \nError: ${error}`);
    }
});
