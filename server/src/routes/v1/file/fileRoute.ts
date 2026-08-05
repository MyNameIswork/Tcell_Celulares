import { Router } from "express";

const router = Router();

import listAllFiles from "@/controller/file/list.controller.js";
import createFile from "@/controller/file/admin/create.controller.js";
import deleteFile from "@/controller/file/admin/delete.controller.js";

router.get("/list", listAllFiles);
router.post("/create", createFile);
router.delete("/delete", deleteFile);

export default router;
