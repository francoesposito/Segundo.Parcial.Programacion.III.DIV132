import { Router } from "express";
import { createProductView, deleteProductView, getProductView, indexView, updateProductView } from "../controllers/view.controller.js";
import { requireLogin, requireAdmin } from "../middlewares/middlewares.js";
import { join, __dirname } from "../../utils/index.js";



const router = Router();

router.get("/index", requireLogin, requireAdmin,  indexView); // /dashboard/index

router.get("/consultar", requireLogin, requireAdmin, getProductView); // /dashboard/consultar

router.get("/crear", requireLogin, requireAdmin, createProductView); // /dashboard/crear

router.get("/modificar", requireLogin, requireAdmin, updateProductView); // /dashboard/modificar

router.get("/eliminar", requireLogin, requireAdmin, deleteProductView); // /dashboard/eliminar

export default router;
