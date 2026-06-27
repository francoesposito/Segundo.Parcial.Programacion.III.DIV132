import { Router } from "express";
import { createProductView, deleteProductView, getProductView, indexView, updateProductView } from "../controllers/view.controller.js";
import { requireLogin } from "../middlewares/middlewares.js";
import { join, __dirname } from "../../utils/index.js";



const router = Router();

router.get("/index", requireLogin, indexView); // /dashboard/index

router.get("/consultar", requireLogin, getProductView); // /dashboard/consultar

router.get("/crear", requireLogin, createProductView); // /dashboard/crear

router.get("/modificar", requireLogin, updateProductView); // /dashboard/modificar

router.get("/eliminar", requireLogin, deleteProductView); // /dashboard/eliminar

export default router;
