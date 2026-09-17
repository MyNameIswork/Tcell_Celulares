import "dotenv/config";
import cors from "cors";

const allowedOrigins = [
    "https://www.tcellcelulares.com",
    "http://localhost:3000", // se usar em dev
];

const corsConfig = cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

export default corsConfig;
