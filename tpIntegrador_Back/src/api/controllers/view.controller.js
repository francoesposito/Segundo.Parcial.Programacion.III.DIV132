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
            productsArray: rows
        })

    } catch (error) {
        console.error("Error obteniendo la información")
        res.status(500).json({
            message: "Error interno obteniendo la información"
        })
    }

}

export const getProductView = (req, res) => {

    res.render("get", {
        title: "Consultar",
        about: "Consultar producto por id: "
    });
}


export const createProductView = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto"
    });
}



export const updateProductView = (req, res) => {
    res.render("put", {
        title: "Modificar",
        about: "Consultar producto por id: "
    });
}



export const deleteProductView = (req, res) => {
    res.render("delete", {
        title: "Eliminar",
        about: "Consultar producto por id: "
    });
}
