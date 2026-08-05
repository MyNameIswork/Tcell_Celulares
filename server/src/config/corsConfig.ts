import "dotenv/config";
import cors from "cors";
//console.log("Front-end: ", process.env.FRONT_URL);

const routesAccess = process.env.FRONT_URL as string;

const corsConfig = cors({
    origin: process.env.NODE_ENV == "development" ? "*" : routesAccess,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    //preflightContinue: false,
    //optionsSuccessStatus: 204,
});

export default corsConfig;
