//////////////////////////////
//          Imports         //
//////////////////////////////

import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import productRouter from "./src/api/routes/product.routes.js";
import saleRouter from "./src/api/routes/sale.routes.js";

const app = express();
const PORT = environments.port;

//////////////////////////////
//        Middlewares       //
//////////////////////////////

app.use(cors());
app.use(express.json()); 

// Ej: [2026-06-23T18:00:00.000Z] GET /api/products
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

//////////////////////////////
//          Routes          //
//////////////////////////////

app.use("/api/products", productRouter);
app.use("/api/sales", saleRouter)

app.get("/", (req, res) => {
    res.send("Servidor Autoservicio corriendo correctamente.");
});

//////////////////////////////
//          Startup         //
//////////////////////////////

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});