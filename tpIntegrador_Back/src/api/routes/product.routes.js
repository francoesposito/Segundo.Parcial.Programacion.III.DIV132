import { Router } from "express";
import { 
    getProducts, 
    getProduct, 
    create, 
    update, 
    del
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/upload.js";
import { validateProduct, validateId } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", getProducts);       // GET /api/products
router.get("/:id", validateId, getProduct);     // GET /api/products/id
router.post("/", upload.single("image"), validateProduct, create);           // POST /api/products
router.put("/:id", validateId, upload.single("image"), validateProduct, update);         // PUT /api/products/id
router.delete("/:id", validateId, del);      // DELETE /api/products/id

export default router;
