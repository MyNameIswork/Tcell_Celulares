import { Router } from "express";

import upload from "@/config/multerConfig.js";

const router = Router();
import listProducts from "@/controller/product/list.controller.js";
import listDigital from "@/controller/product/digital/list.controller.js";
import paginationProducts from "@/controller/product/pagination.controller.js";
import createProduct from "@/controller/product/admin/create.controller.js";
import uploadImgProduct from "@/controller/product/admin/upload.controller.js";
import deleteProduct from "@/controller/product/admin/delete.controller.js";

router.get("/list", listProducts);
router.get("/list/:type", listDigital);
router.get("/store/:page", paginationProducts);
router.post("/create", upload.array("photos", 3), createProduct);
router.post("/upload-image", upload.single("file"), uploadImgProduct);
router.delete("/delete", deleteProduct);

export default router;
