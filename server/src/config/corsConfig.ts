import "dotenv/config";
import cors from "cors";

const routesAccess = process.env.FRONT_URL as string;

const corsConfig = cors({
    origin: process.env.NODE_ENV == "development" ? "*" : routesAccess,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

export default corsConfig;
