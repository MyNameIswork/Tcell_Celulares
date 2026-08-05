import "dotenv/config";
import { Router } from "express";
const router = Router();

const routeAdmin = process.env.ROUTE_ADMIN as string;

import registeNewUser from "@/controller/user/admin/register.controller.js";
import loginUser from "@/controller/user/admin/login.controller.js";
import alterUser from "@/controller/user/admin/alter.controller.js";
import deleteUser from "@/controller/user/admin/delete.controller.js";

router.post(`/${routeAdmin}/register`, registeNewUser);
router.post(`/${routeAdmin}/login`, loginUser);
router.patch(`/${routeAdmin}/alter/email`, alterUser);
router.delete(`/${routeAdmin}/delete`, deleteUser);

export default router;
