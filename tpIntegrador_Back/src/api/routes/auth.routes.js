import { Router } from "express";
import { loginView, processLoginInfo, destroyLogin } from "../controllers/auth.controller.js";

//////////////////////////////
//          Routes          //
//////////////////////////////

const router = Router();

router.get("/login", loginView);
router.post("/login", processLoginInfo);
router.get("/logout", destroyLogin);

export default router;
