import "dotenv/config";
import sevenDays from "./sevenDay.js";

const cookieOptions = {
    httpOnly: true,
    maxAge: sevenDays,
    secure: process.env.NODE_ENV == "development" ? false : true,
    path: "/",
};

export default cookieOptions;
