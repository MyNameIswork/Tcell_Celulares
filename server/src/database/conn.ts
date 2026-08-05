import "dotenv/config";
import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName:
                process.env.NODE_ENV == "development"
                    ? "Tcell_Beta"
                    : (process.env.MONGO_NAME as string),
        });
        console.log("Banco de dados sincronizado com sucesso!");
    } catch (error) {
        console.error(
            "Não foi possível sincronizar com o banco de dados.",
            error
        );
    }
};

export default conn;
