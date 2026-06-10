//////////////////////////////
//          Imports         //
//////////////////////////////

import express from "express";
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

//////////////////////////////////
//          Middlewares         //
//////////////////////////////////

app.use(cors());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next(); // Pasa al siguiente middleware
});

app.use(express.json()); 


////////////////////////////////
//          Endpoints         //
////////////////////////////////


app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

/////////////////////////////////////////////////////
// Primer endpoint GET: Verificamos la conexión a la BBDD

app.get("/api/products", async (req, res) => { 
    try {
        const [rows] = await connection.query("SELECT * FROM products"); 
        res.status(200).json({ 
            payload: rows
        });

    } catch (error) {
        console.error("Error obteniendo productos: ", error.message);
    }
});


//////////////////////////////
// Endpoint GET de UN producto


app.get("/api/products/:id", async (req, res) => { 
    try{
        const { id } = req.params;

        const sql = "SELECT * FROM products WHERE id = ?"
        
        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            payload: rows
        });
    } catch(error) {
        console.error("Error obteniendo producto: ", error.message);
    }
    
});

//////////////////////////////
// Endpoint POST de UN producto


app.post("/api/products", async (req, res) => {
    try {
        const { category, image, name, price } = req.body;

        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

        await connection.query(sql, [name, image, category, price]);

        res.status(200).json({
            message: "Producto creado con éxito"
        });
    } catch (error) {
        console.error("Error enviando producto: ", error.message);
    }
});

//////////////////////////////
// Endpoint PUT de UN producto

app.put("/api/products", async (req, res) => {
    try {
        const { id, name, image, price, category} = req.body;

        let sql = `UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?`;

        await connection.query(sql, [name, image, price, category, id]);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        })
        
    } catch (error) {
        console.error("No se pudo actualizar el producto: ", error.message);
    }
});

/////////////////////////////////
// Endpoint DELETE de UN producto
app.delete("/api/products/:id", async (req, res) => {
    try {
        let { id } = req.params

        const sql = "DELETE FROM products WHERE id = ?"

        await connection.query(sql, [id]);

        res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente.`
        })
    } catch (error) {
        
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});