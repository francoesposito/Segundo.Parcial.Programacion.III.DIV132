import { Router } from "express";
import { createNewUser, deleteExistingUser, getUser } from "../controllers/auth.controller.js";


const router = Router();

router.post("/", createNewUser);
router.get("/:id", getUser);
router.delete("/:id", deleteExistingUser);

export default router;
