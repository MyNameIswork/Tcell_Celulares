import { Router } from "express";

const router = Router();

import listLinks from "@/controller/link/list.controller.js";
import createLink from "@/controller/link/admin/create.controller.js";
import deleteLink from "@/controller/link/admin/delete.controller.js";

router.get("/list", listLinks);
router.post("/create", createLink);
router.delete("/delete", deleteLink);

export default router;
