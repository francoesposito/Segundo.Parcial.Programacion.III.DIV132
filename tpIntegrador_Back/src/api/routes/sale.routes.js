import { Router } from "express";

import { getSales, create } from "../controllers/sale.controller.js"

//////////////////////////////
//          Routes          //
//////////////////////////////

const router = Router();

router.get("/", getSales);   // GET /api/sales
router.post("/", create)     // POST /api/sales

export default router;
