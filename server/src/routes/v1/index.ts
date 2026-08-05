import { Router } from "express";
const router = Router();

import User from "@/routes/v1/user/userRoute.js";
import Product from "@/routes/v1/product/productRoute.js";
import Manutence from "@/routes/v1/manutence/manutenceRoute.js";
import Link from "@/routes/v1/link/linkRoute.js";
import File from "@/routes/v1/file/fileRoute.js";

router.use("/user", User);
router.use("/product", Product);
router.use("/manutence", Manutence);
router.use("/link", Link);
router.use("/file", File);

export default router;
