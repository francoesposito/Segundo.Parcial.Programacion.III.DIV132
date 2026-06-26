import { Router } from "express";
import { createProductView, deleteProductView, getProductView, indexView, updateProductView } from "../controllers/view.controller.js";
import { join, __dirname } from "../../utils/index.js";



const router = Router();

router.get("/index", indexView); // /dashboard/index

router.get("/consultar", getProductView); // /dashboard/consultar

router.get("/crear", createProductView); // /dashboard/crear

router.get("/modificar", updateProductView); // /dashboard/modificar

router.get("/eliminar", deleteProductView); // /dashboard/eliminar



export default router;
