import { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    countProducts
} from "../models/product.model.js";

//////////////////////////////
//       Controllers        //
//////////////////////////////

// Ej query: ?page=1&limit=4
export const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        let products;

        if (page && limit) {
            const offset = (Number(page) - 1) * Number(limit);
            products = await getAllProducts(Number(limit), offset);
        } else {
            products = await getAllProducts();
        }

        res.status(200).json({ payload: products });
    } catch (error) {
        console.error("Error en getProducts controller: ", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Ej params: /api/products/5
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ payload: product });
    } catch (error) {
        console.error("Error en getProduct controller: ", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Ej body: { "name": "Teclado", "price": 4500, "category": "Hardware", "image": "teclado.jpg" }
export const create = async (req, res) => {
    try {
        const { category, image, name, price } = req.body;
        const newProductId = await createProduct({ name, image, category, price });

        res.status(201).json({
            message: "Producto creado con Ã©xito",
            id: newProductId
        });
    } catch (error) {
        console.error("Error en create product controller: ", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Ej params y body: /api/products/5 y { "name": "Teclado RGB", "price": 5000 }
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, price, category } = req.body;

        const updated = await updateProduct(id, { name, image, price, category });

        if (!updated) {
            return res.status(404).json({ message: "Producto no encontrado para actualizar" });
        }

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error en update product controller: ", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Ej params: /api/products/5
export const del = async (req, res) => {
    try {
        const { id } = req.params;
        const deactivated = await deleteProduct(id);

        if (!deactivated) {
            return res.status(404).json({ message: "Producto no encontrado para eliminar" });
        }

        res.status(200).json({ message: `Producto con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error("Error en delete product controller: ", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
