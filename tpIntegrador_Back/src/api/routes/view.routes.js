import { Router } from "express";
import { indexView } from "../controllers/view.controller.js";
import { join, __dirname } from "../../utils/index.js";



const router = Router();

router.get("/", indexView)



export default router;
