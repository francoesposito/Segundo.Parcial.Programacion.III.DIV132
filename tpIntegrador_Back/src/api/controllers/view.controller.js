import { 
    getAllProducts, 
} from "../models/product.model.js";

import { join, __dirname } from "../../utils/index.js";

export const indexView = async (req, res) => {
    try {
        const rows = await getAllProducts();

        res.render("index", {
            title: "Dashboard",
            about: "Nuestros productos",
            productArray : rows
        }) 
        
    } catch (error) {
        console.error("Error obteniendo la información")
        res.status(500).json({
            message : "Error interno obteniendo la información"
        })
    }
    
}

