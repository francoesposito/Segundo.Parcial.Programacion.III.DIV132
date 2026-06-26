import { Router } from "express";
import { 
    getProducts, 
    getProduct, 
    create, 
    update, 
    deactivate 
} from "../controllers/product.controller.js";

//////////////////////////////
//          Routes          //
//////////////////////////////

const router = Router();

router.get("/", getProducts);       // GET /api/products
router.get("/:id", getProduct);     // GET /api/products/id
router.post("/", create);           // POST /api/products
router.put("/:id", update);         // PUT /api/products/id
router.delete("/:id", deactivate);  // DELETE /api/products/id

export default router;
