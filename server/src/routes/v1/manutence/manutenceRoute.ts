import { Router } from "express";
const router = Router();

import getListModels from "@/controller/manutence/search.controller.js";
import listManutence from "@/controller/manutence/list.controller.js";
import createManutence from "@/controller/manutence/admin/create.controller.js";

router.get("/list/manutence", listManutence);
router.get("/list/models", getListModels);
router.post("/create", createManutence);

export default router;
